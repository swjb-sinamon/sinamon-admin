import React, { useState } from 'react';
import styled from 'styled-components';
import { Label, Heading1, Input, BlankLine, showToast, MediumButton } from 'sinamon-sikhye';
import { Helmet } from 'react-helmet';
import Api from '../api';
import ErrorMessage from '../error/ErrorMessage';

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
  readonly id: string;
  readonly password: string;
}

const LoginPage: React.FC = () => {
  const [input, setInput] = useState<LoginState>({
    id: '',
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
    if (input.id.trim() === '' || input.password.trim() === '') {
      showToast('아이디 또는 비밀번호가 빈칸입니다.', 'danger');
      return;
    }

    try {
      await Api.post('/auth/login?admin=true', {
        id: input.id,
        password: input.password
      });

      showToast('로그인 성공! 메인 페이지로 이동합니다.', 'success');
      window.location.reload();
    } catch (e) {
      if (!e.response.data) return;
      const { success, error } = e.response.data;
      if (success || !error) return;

      if (error === ErrorMessage.USER_NOT_FOUND) {
        showToast('존재하지 않는 아이디이거나 잘못된 비밀번호입니다.', 'warning');
        setInput({ id: '', password: '' });
        return;
      }

      if (error === ErrorMessage.NO_PERMISSION) {
        showToast('관리자만 접근 가능한 페이지입니다.', 'warning');
      }
    }
  };

  const onEnterKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') await onLoginClick();
  };

  return (
    <>
      <Helmet>
        <title>로그인 - 수정과 관리자</title>
      </Helmet>

      <Container>
        <StyledForm>
          <div>
            <Heading1>수정과 관리자</Heading1>

            <BlankLine gap={30} />

            <Label>아이디</Label>
            <Input
              placeholder="아이디"
              type="text"
              value={input.id}
              onChange={(e) => onInputChange(e, 'id')}
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
    </>
  );
};

export default LoginPage;
