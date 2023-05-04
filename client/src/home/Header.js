import {
  HeaderBackWrap,
  HeaderWrap,
  LogoWrap,
  SearchWrap,
  DayWrap,
} from './HomeStyle';

const Header = () => {
  return (
    <>
      <HeaderBackWrap>
        <HeaderWrap>
          <LogoWrap src="/Logo/Logo4.png" />
          <SearchWrap></SearchWrap>
        </HeaderWrap>
        <DayWrap></DayWrap>
      </HeaderBackWrap>
    </>
  );
};

export default Header;
