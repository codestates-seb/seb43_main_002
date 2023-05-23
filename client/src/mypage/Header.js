import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Title } from '../style/NewHeaderFooterStyle';
import { SearchSpan } from '../style/HomeStyle';
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

  // props로 받아와서 네비게이터도 구현해야 한다.
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
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    dispatch(setSearchTerm(e.target.value));
  };

  return (
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
          <button onClick={handleClick}>
            <img src={iconSrc} alt="아이콘" />
          </button>
        </>
      )}
    </Title>
  );
};

export default Header;
