import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Mobile,
  BackGround,
  BackYellow,
  Title,
  EditForm,
  EditIcon,
} from '../style/EditProfileStyle';
import axios from 'axios';

const EditProfile = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
    setError,
  } = useForm();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [name, setName] = useState();
  const [nickname, setNickname] = useState();
  const [intro, setIntro] = useState();
  const [birthDay, setBirthDay] = useState();
  const [gender, setGender] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');

  const [profileImage, setProfileImage] = useState();
  const profileImgFileInput = useRef(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/members/1')
      .then((response) => {
        setData(response.data);
        setGender(response.data.gender);
        setProfileImage(response.data.img);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const profileChange = (e) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append('file', e.target.files[0], e.target.files[0].name);

      axios
        .post('/members/images/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response.data); // 이미지 업로드 성공 시 서버에서 전송한 응답 데이터
          setProfileImage(response.data);
        })
        .catch((error) => {
          console.error(error);
          console.log(error.response.data);
        });
    }
  };

  const onSubmit = () => {
    console.log('우선 성공 하는지');

    // 여기서 비밀번호와 확인이 맞는지
    if (password !== confirmPassword) {
      setError('passwordConfirm', {
        type: 'manual',
        message: `비밀번호가 일치하지 않습니다.`,
      });
      return;
    }

    // 일단 post 요청 보냄(원래라면 put이나 patch사용)
    axios
      .post('http://localhost:3001/members', {
        name,
        nickname,
        intro,
        birthDay,
        gender,
        email,
        password,
        img: profileImage,
      })
      .then((response) => {
        reset();
        navigate('/mypage');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleBack() {
    navigate(-1);
  }

  const nameIcon = '/icon/join-name.png';
  const introIcon = '/icon/join-intro.png';
  const dateIcon = '/icon/join-date.png';
  // const genderIcon = '/icon/join-gender.png';
  const mailIcon = '/icon/join-mail.png';
  const pwdIcon = '/icon/join-password.png';

  return (
    <>
      {data && (
        <Mobile>
          <BackGround>
            <BackYellow />
          </BackGround>
          <Title>
            <button onClick={handleBack}>〈</button>
            <div>Edit Profile</div>
            <div></div>
          </Title>
          <EditForm onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <img src={profileImage} alt="프로필 사진" />
                <div></div>
              </div>
              <label htmlFor="file">
                <div></div>
              </label>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={profileChange}
                ref={profileImgFileInput}
              />
            </div>
            <div className="form-name">
              <label htmlFor="name">이름</label>
              <input
                id="name"
                defaultValue={data.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <EditIcon backgroundImage={nameIcon} />
            </div>
            <div className="form-nickname">
              <label htmlFor="nickname">닉네임</label>
              <input
                id="nickname"
                defaultValue={data.nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
              <EditIcon backgroundImage={nameIcon} />
            </div>
            <div className="form-intro">
              <label htmlFor="intro">자기소개</label>
              <input
                id="intro"
                defaultValue={data.intro}
                onChange={(e) => {
                  setIntro(e.target.value);
                }}
              />
              <EditIcon backgroundImage={introIcon} />
            </div>
            <div className="form-birth">
              <label htmlFor="birth">생년월일</label>
              <input
                id="birth"
                type="date"
                defaultValue={data.birth}
                onChange={(e) => {
                  setBirthDay(e.target.value);
                }}
              />
              <EditIcon backgroundImage={dateIcon} />
            </div>
            <div className="form-gender">
              <label htmlFor="gender">성별</label>
              <div>
                <button
                  type="button"
                  className={gender ? 'active' : ''}
                  onClick={() => {
                    setGender(true);
                  }}
                >
                  여성
                </button>
                <button
                  type="button"
                  className={gender ? '' : 'active'}
                  onClick={() => {
                    setGender(false);
                  }}
                >
                  남성
                </button>
              </div>
            </div>
            <div className="form-email">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                defaultValue={data.email}
                {...register('email', {
                  required: true,
                  pattern: {
                    value: '^[w-]+(.[w-]+)*@([w-]+.)+[a-zA-Z]{2,7}$',
                    message: '이메일 유효성 검사, 관련 내용 받아야 함.',
                  },
                })}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <EditIcon backgroundImage={mailIcon} />
            </div>
            <div className="form-pwd">
              <label htmlFor="pwd">비밀번호</label>
              <input
                id="pwd"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <EditIcon backgroundImage={pwdIcon} />
            </div>
            <div className="form-pwd-check">
              <label htmlFor="pwd-check">비밀번호 확인</label>
              <input
                id="pwd-check"
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <EditIcon backgroundImage={pwdIcon} />
              {errors.passwordConfirm && <p>비밀번호가 일치하지 않습니다.</p>}
            </div>
            <button type="submit">수정 완료</button>
          </EditForm>
        </Mobile>
      )}
    </>
  );
};

export default EditProfile;
