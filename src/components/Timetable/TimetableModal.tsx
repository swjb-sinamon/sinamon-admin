import React, { Dispatch, SetStateAction } from 'react';
import { BlankLine, Heading2, Input, Label, MediumButton, Modal, showToast } from 'sinamon-sikhye';
import Api from '../../api';

interface ModalInputState {
  readonly subjectName: string;
  readonly teacher: string;
  readonly zoom: string;
}

interface TimetableModalProps {
  readonly open: [boolean, Dispatch<SetStateAction<boolean>>];
  readonly isEditModal: boolean;
  readonly editId?: number;
  readonly modalInput: [ModalInputState, Dispatch<SetStateAction<ModalInputState>>];
  readonly fetchTimetable: (page: number, _search: string) => void;
}

const SUBJECT_REGEX = /[^(ㄱ-ㅎ가-힣a-zA-Z0-9)]/g;

const TimetableModal: React.FC<TimetableModalProps> = ({
  open,
  isEditModal,
  editId,
  modalInput: modalInputProps,
  fetchTimetable
}) => {
  const [modalInput, setModalInput] = modalInputProps;

  const onModalInputChange = (type: keyof ModalInputState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.persist();
    setModalInput((current) => ({
      ...current,
      [type]: e.target.value
    }));
  };

  const onCreateModalButtonClick = async () => {
    if (!modalInput.subjectName.trim()) {
      showToast('과목명이 비어있습니다.', 'danger');
      return;
    }

    if (!modalInput.teacher.trim()) {
      showToast('담당 선생님이 비어있습니다.', 'danger');
      return;
    }

    if (!modalInput.zoom.trim()) {
      showToast('줌 링크가 비어있습니다.', 'danger');
      return;
    }

    await Api.post('/timetable', {
      subject: modalInput.subjectName.replace(SUBJECT_REGEX, ''),
      teacher: modalInput.teacher.trim(),
      url: modalInput.zoom
    });

    showToast('시간표를 추가했습니다.', 'success');
    open[1](false);
    fetchTimetable(1, '');
  };

  const onEditModalButtonClick = async () => {
    if (!editId) return;

    await Api.put(`/timetable/${editId}`, {
      subject: modalInput.subjectName.replace(SUBJECT_REGEX, ''),
      teacher: modalInput.teacher.trim(),
      url: modalInput.zoom
    });

    showToast('시간표를 수정했습니다.', 'success');
    open[1](false);
    fetchTimetable(1, '');
  };

  return (
    <Modal
      width={450}
      height={450}
      name={isEditModal ? 'EditTimeTable' : 'AddTimeTable'}
      state={open}
    >
      <Heading2>시간표 {isEditModal ? '수정하기' : '추가하기'}</Heading2>
      <BlankLine gap={10} />

      <Label>
        과목명
        <br />
        (과목명에 있는 띄어쓰기, 특수문자는 제거된 상태로 저장됩니다.)
      </Label>
      <Input
        type="text"
        placeholder="ex. 수학"
        value={modalInput.subjectName}
        onChange={onModalInputChange('subjectName')}
      />

      <BlankLine gap={10} />

      <Label>담당 선생님</Label>
      <Input
        type="text"
        placeholder="ex. 홍길동"
        value={modalInput.teacher}
        onChange={onModalInputChange('teacher')}
      />

      <BlankLine gap={10} />

      <Label>줌 링크</Label>
      <Input
        type="text"
        placeholder="ex. https://zoom.us/j/1234?pwd=asdf"
        value={modalInput.zoom}
        onChange={onModalInputChange('zoom')}
      />

      <BlankLine gap={30} />

      <MediumButton onClick={isEditModal ? onEditModalButtonClick : onCreateModalButtonClick}>
        {isEditModal ? '수정하기' : '추가하기'}
      </MediumButton>
    </Modal>
  );
};

export default TimetableModal;
