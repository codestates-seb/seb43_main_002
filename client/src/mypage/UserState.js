/* eslint-disable jsx-a11y/click-events-have-key-events */
import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import { useState, useEffect, useRef } from 'react';
import axiosInstance from '../axiosConfig';
import {
  Mobile,
  BackGround,
  BackYellow,
  Posts,
  PopUp,
  Modal,
} from '../style/UserStateStyle';

const UserState = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  // 리뷰관련
  const [likeClicked, setLikeClicked] = useState(false);
  const [userReviews, setUserReviews] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState([]);
  // 팝업 모달 관련
  const [isOpen, setIsOpen] = useState(true);
  const [postId, setPostId] = useState();
  const [popup, setPopup] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalEffect, setModalEffect] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const mobileContainerRef = useRef(null);

  // 유저가 참가한 식사 목록을 가져오고, 그 식사에 참여한 유저의 목록도 같이 불러옴.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseState, responseMembers] = await Promise.all([
          axiosInstance.get('http://localhost:3001/state'),
          axiosInstance.get('http://localhost:3001/members'),
        ]);
        setData(responseState.data);
        setUser(responseMembers.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 리뷰 작성하는 로직, 사람이 여러명일 수 있기에 맵으로 돌린 이전 리뷰들과 함께 객체 상태로 리뷰를 저장하도록 했다.
  const handleReviewChange = (userId, e) => {
    const newReview = e.target.value;
    setUserReviews((prevReviews) => ({
      ...prevReviews,
      [userId]: newReview,
    }));
  };

  // 리뷰 post 요청 보내는 곳. userId로 사람을 식별해서 객체 중 같은 아이디를 가진 리뷰를 유저 아이디쪽으로 보내도록 함.
  const handleReviewSubmit = (userId) => {
    const comment = userReviews[userId];

    axiosInstance
      .post(`/members/all`, {
        name: '이부분에는',
        img: '로그인한 사용자 정보를 담는 거임!',
        comment,
      })
      .then((response) => {
        const updatedData = response.data;
        setData(updatedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 좋아요 구현한 부분
  // patch 메소드로 해당 유저의 like 값을 1 증가시키는 요청을 보내기
  const handleLike = (userId) => {
    axiosInstance
      .patch(`/${userId}`, {
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

  // 팝업이랑 모달 관리하는 부분
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

  // 리뷰어가 많으면 스크롤 이벤트를 발생시켜야 함..
  function scrollToTop() {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
      modalContent.scrollTo(0, 0);
    }
  }

  const [scrollPosition, setScrollPosition] = useState(0);

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

  return (
    <>
      <Mobile ref={mobileContainerRef} id="mobileContainer">
        <BackGround>
          <BackYellow />
        </BackGround>
        <Header
          iconSrc="/svg/header-logout.svg"
          fnc="logout"
          scrollPosition={scrollPosition}
          scrollNumber={10}
        />
        {isLoading ? (
          <Loading />
        ) : (
          data &&
          user && (
            <>
              <Posts>
                {data.map((el, idx) => {
                  const isDisabled = buttonDisabled[el.id]; // 버튼의 활성화 상태 가져오기
                  return (
                    <div
                      className={el.state ? 'post opacity' : 'post'}
                      key={idx}
                    >
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
                          scrollToTop();
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
                  <div className="modal-content">
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
