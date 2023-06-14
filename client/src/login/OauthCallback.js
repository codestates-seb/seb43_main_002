// import axiosInstance from '../axiosConfig';
// import { useDispatch } from 'react-redux';
// import { login } from '../store/userSlice';

// const handleNaverLoginCallback = () => {
//   const url = new URL(window.location.href);
//   const authorizationCode = url.searchParams.get('code');
//   axiosInstance
//     .post('api/externalAuth/naver', { authorizationCode })
//     .then((response) => {
//       const token = response.data.token;
//       if (token) {
//         const user = {
//           email: response.data.email,
//           nickname: response.data.nickname,
//           memberId: response.data.memberId,
//         };

//         sessionStorage.getItem('user', JSON.stringify(user));
//         sessionStorage.getItem('jwt', token);

//         const dispatch = useDispatch();
//         dispatch(login(user));
//         alert(`${user.nickname}님, 식사는 잡쉈어?`);
//       }
//     })
//     .catch((error) => {
//       if (error.response && error.response.status >= 500) {
//         setServerError(true);
//       } else {
//         alert('로그인에 실패하였습니다. 다시 시도해 주세요');
//       }
//       console.error('Login Error:', error);
//     });
// };

// export default handleNaverLoginCallback;
