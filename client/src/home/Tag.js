import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const Tag = ({ name, onChange, value }) => {
  Tag.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState(value ? value.split(',') : []);

  useEffect(() => {
    setTagList(value ? value.split(',') : []);
  }, [value]);

  // console.log(tagList);

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
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem('');
    onChange({ target: { name, value: updatedTagList.join(',') } });
  };

  const deleteTagItem = (e) => {
    const deletedTag = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter((tagItem) => tagItem !== deletedTag);
    setTagList(filteredTagList);
    onChange({ target: { name, value: filteredTagList.join(',') } });
  };

  return (
    <WholeBox>
      <TagBox>
        <TagInput
          type="text"
          placeholder="Press enter to add tags"
          onChange={(e) => setTagItem(e.target.value)}
          // onChange={handleTagChange}
          value={tagItem}
          onKeyDown={handleKeyDown}
          onKeyPress={onKeyPress}
        />
        {tagList.map((tagItem, index) => {
          return (
            <TagItem key={index}>
              <Text>{tagItem}</Text>
              <TagCloseButton onClick={deleteTagItem}>X</TagCloseButton>
            </TagItem>
          );
        })}
      </TagBox>
    </WholeBox>
  );
};

export default Tag;
