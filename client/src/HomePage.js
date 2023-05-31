import { HomeWrap, SignBtn, BackYellow } from './style/HomePageStyle';
import { FooterText, StyledLink } from './style/LoginStyle';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  function handleSignup() {
    navigate(`/signup`);
  }

  return (
    <HomeWrap>
      <BackYellow />
      <div>
        <div className="logo"></div>
        <h2>식사할 사람 : 구합니다.</h2>
        <p>
          식사메이트 찾기 부터 지역 맛집 정보까지, <br></br> 지금 내 위치에서
          시작해보세요!
        </p>
      </div>
      <div>
        <SignBtn onClick={handleSignup}>시작하기</SignBtn>
        <FooterText>
          이미 계정이 있나요?&nbsp;<StyledLink to="/login">로그인</StyledLink>
        </FooterText>
      </div>
    </HomeWrap>
  );
};

export default HomePage;
