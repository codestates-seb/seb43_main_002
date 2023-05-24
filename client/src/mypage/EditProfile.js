import Header from './Header';
import Loading from './Loading';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Error } from '../style/SignupStyle';
import axiosInstance from '../axiosConfig';
import {
  Mobile,
  BackGround,
  BackYellow,
  EditForm,
  EditIcon,
  ProfileImg,
} from '../style/EditProfileStyle';

const EditProfile = () => {
  const { userId } = useParams();
  const { handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [name, setName] = useState();
  const [nickname, setNickname] = useState();
  const [intro, setIntro] = useState();
  const [birthDay, setBirthDay] = useState();
  const [gender, setGender] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [introLengthError, setIntroLengthError] = useState('');
  const [nameError, setNameError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const imageUrl = `/api/mypages/${userId}/image`;

  const [profileImage, setProfileImage] = useState();
  const [image, setImage] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const accessToken = sessionStorage.getItem(
    process.env.REACT_APP_JWT_TOKEN_NAME
  );
  const mobileContainerRef = useRef(null);

  useEffect(() => {
    axiosInstance
      .get(`/api/mypages/${userId}`)
      .then((response) => {
        setData(response.data);
        setGender(response.data.gender);
        setProfileImage(imageUrl);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [imageUrl, userId]);

  // 파일 업로드 기능 (서버에 X, 화면에 랜더링만)
  function readURL(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfileImage(reader.result);
          setImage(file);
        }
      };
      reader.readAsDataURL(file);
    }
    // input 태그의 value를 초기화합니다.
    e.target.value = null;
  }

  // sumbit 하면서 이미지 파일과 함께 보내기 위해 formData를 사용하고, 다른 내용을 함께 넣음.
  const onSubmit = () => {
    const formData = new FormData();

    const datas = {
      introduce: intro,
      nickname,
      name,
      birthday: birthDay,
      gender,
      password,
      image: userId,
    };

    // 다른 데이터들도 폼데이터 쪽에 담는다.
    formData.append('file', image);
    formData.append(
      'myPageRequestDto',
      new Blob([JSON.stringify(datas)], { type: 'application/json' })
    );

    axiosInstance
      .patch(`/api/mypages/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${accessToken}`,
        },
      })
      .then((response) => {
        reset();
        navigate(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 아래는 유효성 검증 부분
  const handleCheckDuplicateNickname = () => {
    const baseUrl = window.location.origin; // 현재 페이지의 기준 URL

    axiosInstance
      .post(`${baseUrl}/api/members/signup/checkduplicatenickname`, {
        nickname,
      })
      .then((response) => {
        if (response.data === false) {
          alert('사용 가능한 활동명입니다.');
        } else {
          setNicknameError('이미 활동중인 식구이름입니다.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const passwordRegex = /^(?=.[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const validationPassword = (password) => {
    return passwordRegex.test(password);
  };

  const handlePassword = () => {
    if (
      !validationPassword(password) ||
      password.length < 8 ||
      !validationPassword(confirmPassword) ||
      confirmPassword.length < 8
    ) {
      setPasswordError('비밀번호는 영문자,숫자를 포함한 8자 이상이어야합니다.');
    } else if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError(null);
    }
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
    if (e.target.value.length > 8) {
      setNicknameError('8글자까지 입력 가능합니다.');
    } else if (e.target.value.length === 0) {
      setNicknameError('활동명은 필수 입력입니다.');
    } else {
      setNicknameError(null);
    }
  };

  const handleIntro = (e) => {
    setIntro(e.target.value);
    if (e.target.value.length > 20) {
      setIntroLengthError('20글자까지 입력 가능합니다.');
    } else {
      setIntroLengthError(null);
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
    if (e.target.value.length > 8) {
      setNameError('8글자까지 입력 가능합니다.');
    } else if (e.target.value.length === 0) {
      setNameError('이름 필수 입력입니다.');
    } else {
      setNameError(null);
    }
  };

  const [scrollPosition, setScrollPosition] = useState(0);

  // 스크롤에 따른 이벤트
  useEffect(() => {
    const handleScroll = () => {
      const position = mobileContainerRef.current.scrollTop;
      setScrollPosition(position);
    };

    const mobileContainer = mobileContainerRef.current;
    if (mobileContainer) {
      mobileContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mobileContainer) {
        mobileContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const nameIcon = '/svg/join-name.svg';
  const introIcon = '/svg/join-intro.svg';
  const dateIcon = '/svg/join-date.svg';
  const genderIcon = '/svg/join-gender.svg';
  const mailIcon = '/svg/join-mail.svg';
  const pwdIcon = '/svg/join-password.svg';

  return (
    <>
      <Mobile ref={mobileContainerRef} id="mobileContainer">
        <BackGround>
          <BackYellow />
        </BackGround>
        <Header
          iconSrc="/svg/header-back.svg"
          fnc="back"
          scrollPosition={scrollPosition}
          scrollNumber={60}
        />
        {isLoading ? (
          <Loading />
        ) : (
          data && (
            <>
              {' '}
              <ProfileImg>
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
                    onChange={readURL}
                  />
                </div>
              </ProfileImg>
              <EditForm onSubmit={handleSubmit(onSubmit)}>
                <div className="form-email">
                  <label htmlFor="email">
                    <EditIcon backgroundImage={mailIcon} />
                    이메일
                  </label>
                  <input id="email" defaultValue={data.email} readOnly />
                </div>
                <div className="form-nickname">
                  <label htmlFor="nickname">
                    <EditIcon backgroundImage={nameIcon} />
                    활동명
                  </label>
                  <input
                    id="nickname"
                    defaultValue={data.nickname}
                    onChange={handleNickname}
                  />
                  <button type="button" onClick={handleCheckDuplicateNickname}>
                    활동명 중복확인
                  </button>
                  {nicknameError && <Error>{nicknameError}</Error>}
                </div>
                <div className="form-intro">
                  <label htmlFor="intro">
                    <EditIcon backgroundImage={introIcon} />
                    자기소개
                  </label>
                  <input
                    id="intro"
                    defaultValue={data.introduce}
                    onChange={handleIntro}
                  />
                  {introLengthError && <Error>{introLengthError}</Error>}
                </div>
                <div className="form-gender">
                  <label htmlFor="gender">
                    <EditIcon backgroundImage={genderIcon} />
                    성별
                  </label>
                  <div>
                    <button
                      type="button"
                      className={gender ? '' : 'active'}
                      onClick={() => {
                        setGender(false);
                      }}
                    >
                      여성
                    </button>
                    <button
                      type="button"
                      className={gender ? 'active' : ''}
                      onClick={() => {
                        setGender(true);
                      }}
                    >
                      남성
                    </button>
                  </div>
                </div>
                <div className="form-name">
                  <label htmlFor="name">
                    <EditIcon backgroundImage={nameIcon} />
                    이름
                  </label>
                  <input
                    id="name"
                    defaultValue={data.name}
                    onChange={handleName}
                  />
                  {nameError && <Error>{nameError}</Error>}
                </div>
                <div className="form-pwd">
                  <label htmlFor="pwd">
                    <EditIcon backgroundImage={pwdIcon} />
                    비밀번호
                  </label>
                  <input
                    id="pwd"
                    type="password"
                    placeholder="숫자, 영문자 포함 8글자 이상이어야 합니다."
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="form-pwd-check">
                  <label htmlFor="pwd-check">
                    <EditIcon backgroundImage={pwdIcon} />
                    비밀번호 확인
                  </label>
                  <input
                    id="pwd-check"
                    type="password"
                    placeholder="비밀번호를 한 번 더 입력해주세요."
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <button type="button" onClick={handlePassword}>
                    비밀번호 일치 여부 확인
                  </button>
                  {passwordError && <Error>{passwordError}</Error>}
                </div>
                <div className="form-birth">
                  <label htmlFor="birth">
                    <EditIcon backgroundImage={dateIcon} />
                    생년월일
                  </label>
                  <input
                    id="birth"
                    type="date"
                    defaultValue={data.birthday}
                    onChange={(e) => {
                      setBirthDay(e.target.value);
                    }}
                  />
                </div>
                <button type="submit">수정 완료</button>
              </EditForm>
            </>
          )
        )}
      </Mobile>
    </>
  );
};

export default EditProfile;
