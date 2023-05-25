import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Title, TitleBox, Space } from '../style/NewHeaderFooterStyle';
import { SearchSpan, RefreshButton } from '../style/HomeStyle';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../store/boardSlice';
// eslint-disable-next-line react/prop-types
const Header = ({ iconSrc, fnc, scrollPosition, scrollNumber }) => {
  // eslint-disable-next-line no-unused-vars
  const backgroundImage =
    scrollPosition >= scrollNumber
      ? 'linear-gradient(135deg, #ffd571, #ffac36)'
      : 'none';

  const navigate = useNavigate();

  const [onSearch, setOnSerach] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();

  function handleClick() {
    if (fnc === 'logout') {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('jwt');
      alert('로그아웃 되었습니다.');
      dispatch(logout());
      navigate('/');
    } else if (fnc === 'back') {
      navigate(-1);
    } else if (fnc === 'search') {
      // console.log('검색');
      setOnSerach(false);
    }
  }

  const SearchPost = () => {
    dispatch(setSearchTerm(searchValue));
    setSearchValue('');
    setOnSerach(true); // 검색 후에는 onSearch 값을 false로 변경
  };

  const handleRefresh = () => {
    dispatch(setSearchTerm(''));
    setOnSerach(true);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <TitleBox backgroundImage={backgroundImage}>
        <Title>
          <div></div>
          {onSearch ? (
            <>
              <div>Sik:Gu</div>
              <button onClick={handleClick}>
                <img src={iconSrc} alt="아이콘" />
              </button>
            </>
          ) : (
            <>
              <SearchSpan
                value={searchValue}
                placeholder="Search..."
                onChange={handleSearch}
              ></SearchSpan>
              <RefreshButton
                src="/svg/header-refresh.svg"
                alt="수정버튼"
                onClick={handleRefresh}
              ></RefreshButton>
              <button onClick={SearchPost}>
                <img src={iconSrc} alt="아이콘" />
              </button>
            </>
          )}
        </Title>
      </TitleBox>
      <Space />
    </>
  );
};

export default Header;
