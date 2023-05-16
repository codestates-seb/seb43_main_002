import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  WholeBox,
  TagBox,
  TagItem,
  Text,
  TagCloseButton,
  TagInput,
} from '../style/TagStyle';

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
