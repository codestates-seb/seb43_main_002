import {
  HeaderBackWrap,
  HeaderWrap,
  LogoWrap,
  SearchWrap,
  LogoutButton,
} from '../style/HomeStyle';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';
import { setSearchTerm } from '../store/boardSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [onSearch, setOnSerach] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('jwt');
    alert('로그아웃 되었습니다.');
    dispatch(logout());
    navigate('/');
  };

  const SearchHandler = () => {
    setOnSerach(!onSearch);
  };

  const onSearchTermChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
    console.log('검색어 : ', e.target.value);
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

  return (
    <>
      <HeaderBackWrap>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        {onSearch ? (
          <>
            <SearchSpan
              visible={onSearch}
              placeholder="음식 이름, 작성자, 내용, 태그 또는 댓글을 검색하세요."
              onChange={onSearchTermChange}
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
