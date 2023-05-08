import styled from 'styled-components';
import { BoardWrap } from './HomeStyle';
import { useState } from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import Comment from './Comment';

const SexInfomaitonWrap = styled.div`
  padding: 10px;
  border-bottom: 1px solid #000000;
  font-size: 12px;
`;

const ContentWrap = styled.div`
  margin-top: 10px;
  padding: 0px;
  border-left: 3px solid #ffddac;
`;

const ContentHeader = styled.h2`
  padding: 0px 0px 0px 10px;
  font-size: 16px;
`;

const BoardContentWrap = styled.div`
  padding: 10px;
  font-size: 12px;
`;

const TagWrap = styled.div`
  padding: 0px;
  font-size: 12px;
  display: flex;
`;

const TagBlock = styled.div`
  margin-left: 10px;
  padding: 5px;
  font-size: 10px;
  background-color: #ffddac;
  border-radius: 10px;
`;

const SubmitWrap = styled.div`
  margin-top: 10px;
  padding: 0px;
  display: flex;
`;

const TimeWrap = styled.div`
  margin-left: 10px;
  padding: 0px;
  font-size: 10px;
  display: flex;
  color: #3e3c3a;
  svg {
    margin-right: 10px;
    padding: 0px;
    font-size: 15px;
  }
`;

const PeopleWrap = styled.div`
  margin-left: 30px;
  padding: 0px;
  font-size: 10px;
  display: flex;
  color: #3e3c3a;
  svg {
    margin-right: 10px;
    padding: 0px;
    font-size: 15px;
  }
`;

const UserWrap = styled.span`
  padding: 0px;
  margin-left: auto;
  border: 1px solid black;
  border-radius: 50%;
`;

const Board = () => {
  const initialTag = ['햄버거', '맛집', '수원', '오후 7시'];
  const [tags, setTags] = useState(initialTag);
  // console.log(tags);

  return (
    <BoardWrap>
      <SexInfomaitonWrap>누구나 참여 가능</SexInfomaitonWrap>
      <ContentWrap>
        <ContentHeader>바질 크림 스파게티</ContentHeader>
        <BoardContentWrap>
          오늘 7시에 ##동 롯데리아로 신제품 햄버거 먹으러 가실 파티원 구합니다!
          감튀 드실 분은 제 거 양보해 드릴 수 있어요!
        </BoardContentWrap>
      </ContentWrap>
      <TagWrap>
        {tags.map((tag, idx) => (
          <TagBlock key={idx} setTags={setTags}>
            {tag}
          </TagBlock>
        ))}
      </TagWrap>
      <SubmitWrap>
        <TimeWrap>
          <BiTimeFive />
          오후 7시
        </TimeWrap>
        <PeopleWrap>
          <FiUsers />
          3/6명
        </PeopleWrap>
        <UserWrap>고양이</UserWrap>
      </SubmitWrap>
      <Comment></Comment>
    </BoardWrap>
  );
};

export default Board;
