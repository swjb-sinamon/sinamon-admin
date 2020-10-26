import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading1 } from '../atomics/Typography/Heading';
import BlankLine from '../utils/BlankLine';
import Label from '../atomics/Form/Label';
import Input from '../atomics/Form/Input';
import { MediumButton } from '../atomics/Button';
import Api from '../api';
import ErrorMessage from '../error/ErrorMessage';
import showToast from '../utils/Toast';

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface LoginState {
  readonly email: string;
  readonly password: string;
}

const LoginPage: React.FC = () => {
  const [input, setInput] = useState<LoginState>({
    email: '',
    password: ''
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof LoginState) => {
    e.persist();

    setInput((current) => ({
      ...current,
      [type]: e.target.value
    }));
  };

  const onLoginClick = async () => {
    if (input.email.trim() === '' || input.password.trim() === '') {
      showToast('❗ 이메일 또는 비밀번호가 빈칸입니다.', 'danger');
      return;
    }

    const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!emailRegex.test(input.email)) {
      showToast('❗ 올바른 이메일이 아닙니다.', 'danger');
      return;
    }

    try {
      await Api.post('/auth/login?admin=true', {
        email: input.email,
        password: input.password
      });

      showToast('🎉 로그인 성공! 메인 페이지로 이동합니다.', 'success');
      window.location.reload();
    } catch (e) {
      if (!e.response.data) return;
      const { success, error } = e.response.data;
      if (success || !error) return;

      if (error === ErrorMessage.USER_NOT_FOUND) {
        setInput({ email: '', password: '' });
        return;
      }

      if (error === ErrorMessage.NO_PERMISSION) {
        showToast('💡 관리자만 접근 가능한 페이지입니다.', 'warning');
      }
    }
  };

  const onEnterKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') await onLoginClick();
  };

  return (
    <Container>
      <StyledForm>
        <div>
          <Heading1>수정과 관리자</Heading1>

          <BlankLine gap={30} />

          <Label>이메일</Label>
          <Input
            placeholder="이메일"
            type="email"
            value={input.email}
            onChange={(e) => onInputChange(e, 'email')}
          />

          <BlankLine gap={20} />

          <Label>비밀번호</Label>
          <Input
            placeholder="비밀번호"
            type="password"
            value={input.password}
            onChange={(e) => onInputChange(e, 'password')}
            onKeyPress={onEnterKeyPress}
          />

          <BlankLine gap={30} />

          <MediumButton onClick={onLoginClick}>로그인</MediumButton>
        </div>
      </StyledForm>
    </Container>
  );
};

export default LoginPage;
