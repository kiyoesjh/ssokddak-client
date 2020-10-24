import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import MorePop from './MorePop';

const PostWrap = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto 15px;
  border-radius: 10px;
  overflow: hidden;
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    /* content: ''; */
  }
`;

const PostText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 10;
`;

const PostImg = styled.img`
  width: 100%;
  height: auto;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.5);
`;

const DeleteButton = styled(Button)`
  right: 0;
`;

const Ssok = ({ ssokData, isOwner }) => {
  const [editing, setEditing] = useState(false); //수정하고 있는지 아닌지에 대한 상태
  const [newSsok, setNewSsok] = useState(ssokData.text); //input값을 수정할 수 있는 상태값, 초기값=수정하기 전에 있던 텍스트
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async () => {
    const ok = window.confirm('삭제하시겠습니까?');
    if (ok) {
      await dbService.doc(`ssok/${ssokData.id}`).delete(); //doc(경로) => collection 안에 document 가 있기 때문에 'collection이름/document 아이디'로 작성
      await storageService.refFromURL(ssokData.attachmentURL).delete(); //refFromURL => 입력받은 url을 firebase 가 storage 안에서 url reference 를 찾아 그 reference로 리턴하는 method
    }
  };
  const onUpdate = ({ target: { value } }) => setNewSsok(value);
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = (event) => {
    event.preventDefault();
    dbService.doc(`ssok/${ssokData.id}`).update({
      text: newSsok,
    });
    setEditing(false);
  };
  return (
    <>
      {editing ? ( //수정하기를 눌렀다면? 폼이 나오게 된다.
        <form onSubmit={onSubmit}>
          <input
            type="text"
            onChange={onUpdate}
            value={newSsok}
            required
            placeholder="Write your mind"
          />
          <button type="button" onClick={toggleEditing}>
            취소
          </button>
          <button type="submit">완료</button>
        </form>
      ) : (
        <PostWrap>
          <PostText>{ssokData.text}</PostText>
          {ssokData.attachmentURL && <PostImg src={ssokData.attachmentURL} />}
          {isOwner && ( //글쓴 사람일 경우에만 수정, 삭제 버튼이 보일 수 있도록 체크
            <>
              <MorePop setIsOpen={setIsOpen} isOpen={isOpen}>
                <DeleteButton type="button" onClick={onDelete}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </DeleteButton>
                <button type="button" onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </MorePop>
            </>
          )}
        </PostWrap>
      )}
    </>
  );
};

export default Ssok;
