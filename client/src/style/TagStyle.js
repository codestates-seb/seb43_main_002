import styled from 'styled-components';

const WholeBox = styled.div`
  padding: 10px;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
  margin: 10px;
  padding: 0 10px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  &:focus-within {
    border-color: white;
  }
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: black;
  border-radius: 5px;
  color: white;
  font-size: 13px;
`;

const Text = styled.span``;

const TagCloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: white;
  border-radius: 50%;
  color: tomato;
`;

const TagInput = styled.input`
  display: inline-flex;
  width: 310px;
  max-width: 310px;
  min-width: 150px;
  background: white;
  border: none;
  outline: none;
  cursor: text;
`;
export { WholeBox, TagBox, TagItem, Text, TagCloseButton, TagInput };
