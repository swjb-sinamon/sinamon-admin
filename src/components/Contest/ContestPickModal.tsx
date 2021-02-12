import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { BlankLine, Heading2, Heading3, Label, MediumButton, Modal, showToast } from 'sinamon-sikhye';
import swal from 'sweetalert';
import { ContestType } from '../../types/Payload';
import Api from '../../api';

interface ContestPickModalProps {
  readonly state: [boolean, Dispatch<SetStateAction<boolean>>];
}

interface ContestPickModalState<T> {
  readonly idea: T;
  readonly dev: T;
  readonly design: T;
}

const ContestPickModal: React.FC<ContestPickModalProps> = ({ state }) => {
  const [count, setCount] = useState<ContestPickModalState<number>>({
    idea: 0,
    dev: 0,
    design: 0
  });
  const [data, setData] = useState<ContestPickModalState<ContestType[]>>({
    idea: [],
    dev: [],
    design: []
  });
  const [result, setResult] = useState<[ContestType, ContestType, ContestType][]>([]);

  useEffect(() => {
    Api.get('/contest?limit=30&page=1&role=IDEA&filters[isJoin]=0')
      .then((res) => {
        if (res.data && res.data.success) {
          setCount((current) => ({
            ...current,
            idea: res.data.count
          }));
          setData((current) => ({
            ...current,
            idea: res.data.data
          }));

          return Api.get('/contest?limit=30&page=1&role=DEVELOP&filters[isJoin]=0');
        }

        return null;
      })
      .then((res) => {
        if (res && res.data && res.data.success) {
          setCount((current) => ({
            ...current,
            dev: res.data.count
          }));
          setData((current) => ({
            ...current,
            dev: res.data.data
          }));

          return Api.get('/contest?limit=30&page=1&role=DESIGN&filters[isJoin]=0');
        }

        return null;
      })
      .then((res) => {
        if (res && res.data && res.data.success) {
          setCount((current) => ({
            ...current,
            design: res.data.count
          }));
          setData((current) => ({
            ...current,
            design: res.data.data
          }));
        }
      });
  }, []);

  const onPickClick = () => {
    setResult([]);

    /* eslint-disable no-param-reassign */
    const shuffle = (a: any[]) => {
      let j;
      let x;
      let i;
      for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
    };

    const teams = Object.values(count).reduce((a, b) => {
      return Math.min(a, b);
    });

    if (teams === 0) {
      showToast('추첨을 위한 참여자가 부족합니다.', 'warning');
      return;
    }

    const idea = data.idea.slice();
    const dev = data.dev.slice();
    const design = data.design.slice();

    shuffle(idea);
    shuffle(dev);
    shuffle(design);

    for (let i = 0; i < teams; i += 1) {
      setResult((current) => [...current, [idea[i], dev[i], design[i]]]);
    }
  };

  const onApplyClick = async () => {
    if (result.length === 0) {
      showToast('먼저 추첨하기를 통해 팀 구성을 해주세요.', 'warning');
      return;
    }

    const confirm = await swal({
      title: '정말로 확정하시겠습니까?',
      text: '확정 후에는 변경이 불가능합니다.',
      icon: 'success',
      buttons: ['취소', '삭제']
    });

    if (!confirm) return;

    const promise = result.map(async (item) => {
      await Api.patch('/contest', { uuid: item[0].uuid });
      await Api.patch('/contest', { uuid: item[1].uuid });
      await Api.patch('/contest', { uuid: item[2].uuid });
    });

    await Promise.all(promise);

    showToast('팀 구성이 확정되었습니다.', 'success');

    window.location.reload();
  };

  return (
    <Modal width={500} height={500} name="PickMember" state={state}>
      <Heading2>공모전 팀 추첨</Heading2>
      <Heading3>추첨 후 팀 목록을 확정해주세요.</Heading3>
      <BlankLine gap={10} />

      <div>
        <Label>기획, 개발, 디자인 순으로 팀원 이름이 표시됩니다.</Label>

        <div>
          {result.map((value, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <b>TEAM {index + 1} : </b>
              <span>{value[0].name}, </span>
              <span>{value[1].name}, </span>
              <span>{value[2].name}</span>
            </div>
          ))}
        </div>
      </div>

      <BlankLine gap={20} />

      <MediumButton onClick={onPickClick}>추첨하기</MediumButton>

      <BlankLine gap={10} />

      <MediumButton onClick={onApplyClick}>확정하기</MediumButton>
    </Modal>
  );
};

export default ContestPickModal;
