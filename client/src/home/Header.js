import { HeaderBackWrap, HeaderWrap, LogoWrap, SearchWrap } from './HomeStyle';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import styled from 'styled-components';

const Header = () => {
  const [onSearch, setOnSerach] = useState(false);

  const SearchHandler = () => {
    setOnSerach(!onSearch);
  };

  const SearchSpan = styled.input`
    display: ${() => (onSearch ? 'block' : 'none')};
    margin: 20px;
    padding: 0px;
    height: 10%;
    width: 85%;
    border: 1px solid black;
    border-radius: 10px;
  `;

  //   const SearchIcon = styled(AiOutlineSearch)`
  //     position: absolute;
  //     top: 50%;
  //     right: 10px;
  //     transform: translateY(-50%);
  //   `;

  return (
    <>
      <HeaderBackWrap>
        {onSearch ? (
          <>
            <SearchSpan
              visible={onSearch}
              placeholder="무슨 기준으로 검색할까요?"
            ></SearchSpan>
            <SearchWrap>
              <AiOutlineSearch
                className="icon"
                onClick={SearchHandler}
                color="white"
              ></AiOutlineSearch>
            </SearchWrap>
          </>
        ) : (
          <>
            <HeaderWrap>
              <LogoWrap src="/Logo/Logo4.png" />
            </HeaderWrap>
            <SearchWrap>
              <AiOutlineSearch
                className="icon"
                onClick={SearchHandler}
                color="white"
              ></AiOutlineSearch>
            </SearchWrap>
          </>
        )}
      </HeaderBackWrap>
    </>
  );
};

export default Header;
