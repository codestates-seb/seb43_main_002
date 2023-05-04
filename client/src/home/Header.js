import { HeaderBackWrap, HeaderWrap, SearchWrap, DayWrap } from './HomeStyle';

const Header = () => {
  return (
    <>
      <HeaderBackWrap>
        <HeaderWrap>
          Sik:Gu
          <SearchWrap></SearchWrap>
        </HeaderWrap>
        <DayWrap></DayWrap>
      </HeaderBackWrap>
    </>
  );
};

export default Header;
