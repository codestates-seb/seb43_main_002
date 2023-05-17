import { Title } from '../style/NewHeaderFooterStyle';

// eslint-disable-next-line react/prop-types
const Header = ({ iconSrc }) => {
  // props로 받아와서 네비게이터도 구현해야 한다.
  return (
    <Title>
      <div></div>
      <div>Sik:Gu</div>
      <button>
        <img src={iconSrc} alt="아이콘" />
      </button>
    </Title>
  );
};

export default Header;
