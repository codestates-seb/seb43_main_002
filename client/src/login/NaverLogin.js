// const NaverLoginForm = () => {
//   const handleLogin = () => {
//     const naverLoginUrl = ''; //네이버에서 받아온 URL을 넣으면 될 것 같음;
//     const clientId = 'my Id';
//     const redirectUri = encodeURIComponent('https://sik-gu/api/boards');
//     const responseType = 'code'; //?
//     const state = 'RANDOM_STATE'; // Replace this with a random string for security?
//     window.location.href = naverLoginUrl;
//   };
//   return <button onSubmit={handleLogin}>네이버로 로그인</button>;
// };
// export default NaverLoginForm;

// const naverLogin = () => {
//   const naverLoginUrl = 'https://nid.naver.com/oauth2.0/authorize';
//   const clientId = 'YOUR_CLIENT_ID'; // Your actual client id
//   const redirectUri = encodeURIComponent(
//     'http://localhost:3000/oauth2/callback/naver'
//   ); // Your actual redirect URI
//   const responseType = 'code';
//   const state = 'RANDOM_STATE'; // Replace this with a random string for security

//   const apiURL = `${naverLoginUrl}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&state=${state}`;

//   window.location.href = apiURL;
// };
