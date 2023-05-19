import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { Title, TitleBox, Space } from '../style/NewHeaderFooterStyle';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line react/prop-types
const Header = ({ iconSrc, fnc, scrollPosition, scrollNumber }) => {
  const backgroundImage =
    scrollPosition >= scrollNumber
      ? 'linear-gradient(135deg, #ffd571, #ffac36)'
      : 'none';

  const navigate = useNavigate();
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
    }
  }

  return (
    <>
      <TitleBox backgroundImage={backgroundImage}>
        <Title>
          <div></div>
          <div>Sik:Gu</div>
          <button onClick={handleClick}>
            <img src={iconSrc} alt="아이콘" />
          </button>
        </Title>
      </TitleBox>
      <Space />
    </>
  );
};

export default Header;
