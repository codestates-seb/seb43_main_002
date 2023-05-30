const NaverLoginForm = () => {
  const handleLogin = () => {
    const naverLoginUrl = ''; //네이버에서 받아온 URL을 넣으면 될 것 같음;
    window.location.href = naverLoginUrl;
  };
  return <button onSubmit={handleLogin}>네이버로 로그인</button>;
};
export default NaverLoginForm;
