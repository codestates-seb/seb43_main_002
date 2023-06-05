import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WholeBox = styled.div`
  margin-top: 15px;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 40px;
  width: 360px;
  padding: 0 10px;
  color: #505050;
  font-size: 12pt;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  border: none;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
  &:focus-within {
    border-color: white;
  }
  /* justify-content: flex-end; */
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 7px 5px 7px 0;
  padding: 5px;
  background-color: #ffddac;
  border-radius: 15px;
  color: black;
  > span {
    font-size: 11pt;
  }
`;

const Text = styled.span``;

const TagCloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 10px;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: #ffac36;
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;
`;

const TagInput = styled.input`
  display: inline-flex;
  /* width: auto; */
  flex: 1;
  height: 40px;
  /* max-width: 310px;
  min-width: 150px; */
  background: white;
  border: none;
  outline: none;
  cursor: text;
`;

const Tag = ({ name, onChange, tagList, setTagList, setPostBoard }) => {
  Tag.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    tagList: PropTypes.array.isRequired,
    setTagList: PropTypes.func.isRequired,
    setPostBoard: PropTypes.array.isRequired,
  };

  const [tagItem, setTagItem] = useState('');

  // useEffect(() => {
  //   setTagList(tagList);
  // }, [tagList]);

  // console.log('tag', tagList);

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      submitTagItem();
    }
  };

  // const handleTagChange = (e) => {
  //   const { value } = e.target;
  //   const tags = value.split(',');
  //   onChange({ target: { name, value: tags } });
  // };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    if (tagItem.trim().length === 0) {
      return;
    }
    const updatedTagList = [...tagList, tagItem];
    setTagList(updatedTagList);
    setTagItem('');
    onChange({ target: { name, value: updatedTagList } });
  };

  const deleteTagItem = (e) => {
    e.preventDefault();
    const deletedTag = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter((tagItem) => tagItem !== deletedTag);
    setTagList(filteredTagList);
  };

  return (
    <WholeBox>
      <TagBox>
        {tagList.map((tagItem, index) => {
          return (
            <TagItem key={index}>
              <Text>{tagItem}</Text>
              <TagCloseButton onClick={deleteTagItem}>X</TagCloseButton>
            </TagItem>
          );
        })}
        <TagInput
          type="text"
          placeholder="태그를 입력하시고 Enter를 눌러주세요"
          onChange={(e) => setTagItem(e.target.value)}
          // onChange={handleTagChange}
          value={tagItem}
          onKeyDown={handleKeyDown}
          onKeyPress={onKeyPress}
        />
      </TagBox>
    </WholeBox>
  );
};

export default Tag;
