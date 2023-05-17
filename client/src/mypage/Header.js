import { useNavigate } from 'react-router-dom';
import { Title } from '../style/NewHeaderFooterStyle';

// eslint-disable-next-line react/prop-types
const Header = ({ iconSrc, fnc }) => {
  const navigate = useNavigate();
  // props로 받아와서 네비게이터도 구현해야 한다.

  function handleClick() {
    if (fnc === 'logout') {
      console.log('로그아웃 됨');
    } else if (fnc === 'back') {
      navigate(-1);
    }
  }

  return (
    <Title>
      <div></div>
      <div>Sik:Gu</div>
      <button onClick={handleClick}>
        <img src={iconSrc} alt="아이콘" />
      </button>
    </Title>
  );
};

export default Header;
