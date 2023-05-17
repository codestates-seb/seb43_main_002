/* eslint-disable jsx-a11y/click-events-have-key-events */
import Footer from './Footer';
import Header from './Header';
import Loding from './Loding';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Mobile,
  BackGround,
  BackYellow,
  Posts,
  PopUp,
  Modal,
} from '../style/UserStateStyle';

const UserState = () => {
  const [likeClicked, setLikeClicked] = useState(false);
  const [userReviews, setUserReviews] = useState({});
  const [data, setData] = useState();
  const [user, setUser] = useState();

  const [isOpen, setIsOpen] = useState(true);
  const [postId, setPostId] = useState();
  const [popup, setPopup] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalEffect, setModalEffect] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState([]);

  useEffect(() => {
    axios
      // 로그인 된 유저의 id를 어떻게 가져와야 할지.. API 문서가 있어야 알 거 같음.
      .get('http://localhost:3001/state')
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });

    axios
      .get('http://localhost:3001/members', {
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleReviewChange = (userId, e) => {
    const newReview = e.target.value;
    setUserReviews((prevReviews) => ({
      ...prevReviews,
      [userId]: newReview,
    }));
  };

  const handleReviewSubmit = (userId) => {
    // 현재 빈 값으로 둔 name이랑 img는 로그인 된 유저 정보를 받아와야 한다.
    // 이 부분은 얘기를 해보는 게 좋겠음!

    const comment = userReviews[userId];
    axios
      .post(`/members/all`, {
        name: `테스트`,
        img: `테스트`,
        comment,
      })
      .then((response) => {
        setData(response.data);
        console.log('성공');
      })
      .catch((error) => {
        console.log(error);
        console.log('실패');
      });
  };

  const handleLike = (userId) => {
    // PUT 메소드로 해당 유저의 like 값을 1 증가시키는 요청을 보내기
    axios
      .patch(`/${userId}`, {
        //user.id와 같은 값을 가진 데이터를 찾아서 like를 업데이트 시켜준다.
        like: user.find((el) => el.id === userId).like + 1,
      })
      .then((response) => {
        const updatedUser = response.data;
        setUser((data) =>
          data.map((el) => (el.id === updatedUser.id ? updatedUser : el))
        );
        setLikeClicked(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function handleOpen() {
    setModalEffect(false);

    if (popup) {
      setPopup(false);
    } else if (modal) {
      setPopup(false);
      setTimeout(() => {
        setModal(false);
      }, 300);
    } else {
      setIsOpen(false);
    }
  }

  function handlePopup(postId) {
    setPostId(postId);
    setPopup(!popup);
  }

  function handleModalTrue() {
    setModalEffect(true);
    setModal(!modal);
    setPopup(false);

    setData((prevData) =>
      prevData.map((el) => (el.id === postId ? { ...el, state: true } : el))
    );
  }

  function handleModalFalse() {
    // 거절 버튼 눌렀을 경우
    setModal(false);
    setPopup(false);
    // 버튼 비활성화 상태 업데이트
    setButtonDisabled((prevButtonDisabled) => ({
      ...prevButtonDisabled,
      [postId]: false,
    }));
  }

  return (
    <>
      <Mobile>
        <BackGround>
          <BackYellow />
        </BackGround>
        <Header iconSrc="/svg/header-logout.svg" fnc="logout" />
        {isLoading ? (
          <Loding />
        ) : (
          data &&
          user && (
            <>
              <Posts>
                {data.map((el, idx) => {
                  const isDisabled = buttonDisabled[el.id]; // 버튼의 활성화 상태 가져오기
                  return (
                    <div className="post" key={idx}>
                      <div className={el.state ? 'complete' : 'before'}></div>
                      <div>
                        <ul>
                          <li>{el.title}</li>
                          <li>
                            <img src="svg/main-date.svg" alt="날짜아이콘" />
                            <span>{el.date}</span>
                            <img src="svg/main-time.svg" alt="시간아이콘" />
                            <span>{el.time}</span>
                            <img src="svg/main-people.svg" alt="아이콘" />
                            <span>{el.part}</span>
                          </li>
                        </ul>
                      </div>
                      <button
                        onClick={() => {
                          handlePopup(el.id);
                        }}
                        disabled={isDisabled || el.state}
                      >
                        {!el.state ? (
                          <img src="svg/userstate-plus.svg" alt="확인버튼" />
                        ) : (
                          <img src="svg/userstate-minus.svg" alt="확인버튼" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </Posts>
              <PopUp
                className={popup && isOpen ? '' : 'hide'}
                onClick={handleOpen}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => e.stopPropagation()}
                  className={popup ? 'scale-in' : 'scale-out'}
                >
                  <ul>
                    <li>
                      <h3>완료되셨나요?</h3>
                    </li>
                    <li>즐거운 식사를 마치셨다면 완료해주세요!</li>
                    <li>
                      <button onClick={handleModalTrue}>완료</button>
                      <button onClick={handleModalFalse}>취소</button>
                    </li>
                  </ul>
                </div>
              </PopUp>
              <Modal
                className={modal && isOpen ? '' : 'hide'}
                onClick={handleOpen}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={(e) => e.stopPropagation()}
                  className={modalEffect ? 'slide-in' : 'slide-out'}
                >
                  <div className="header">
                    <div></div>
                    <div>
                      <span>좋은 식구들을 만나셨나요?</span>
                      <h3>식구들을 평가해주세요.</h3>
                    </div>
                  </div>
                  {user.map((el, idx) => {
                    return (
                      <div className="post" key={idx}>
                        <div>
                          <img src={el.img} alt="프로필 이미지" />
                          <div>
                            <div>
                              <div>{el.nickname}</div>
                              <div>{el.intro}</div>
                            </div>
                            <button
                              onClick={() => {
                                handleLike(el.id);
                              }}
                              disabled={likeClicked}
                            >
                              <img
                                src={
                                  likeClicked
                                    ? '/svg/like-2.svg'
                                    : '/svg/like.svg'
                                }
                                alt="좋아요"
                              />
                            </button>
                          </div>
                          <div>
                            <input
                              placeholder="한 줄 평가를 입력하세요. (최대 20글자)"
                              onChange={(e) => handleReviewChange(el.id, e)}
                              maxLength="20"
                            />
                            <button onClick={() => handleReviewSubmit(el.id)}>
                              확인
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Modal>
            </>
          )
        )}
      </Mobile>
      <Footer activeIcon="state" />
    </>
  );
};

export default UserState;
