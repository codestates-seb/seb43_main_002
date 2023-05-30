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

  //  상태 관련
  // eslint-disable-next-line no-unused-vars
  const [time, setTimes] = useState([]);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);
  const [mealState, setMealStates] = useState([]);
  const [showButton, setShowButton] = useState([]);

  // 리뷰관련
  const [liked, setLiked] = useState([]);
  const [userReviews, setUserReviews] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState([]);
  const [historyFrontId, setHistoryFrontId] = useState([]);
  const myPageId = JSON.parse(sessionStorage.getItem('user')).memberId;

  // 팝업 모달 관련
  const [isOpen, setIsOpen] = useState(true);
  const [postId, setPostId] = useState();
  const [popup, setPopup] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalEffect, setModalEffect] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const mobileContainerRef = useRef(null);

  // 1시간마다 상태를 갱신시켜줌.
  useEffect(() => {
    fetchData(); // 초기 데이터를 가져와야 함.

    const interval = setInterval(fetchData, 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // 유저가 참가한 식사 목록을 가져오고, 그 식사에 참여한 유저의 목록도 같이 불러옴.
  // 위에서 이미 useEffect를 사용해서 불러오므로 여기는 그대로 둔당.
  const fetchData = () => {
    setIsLoading(true);

    axiosInstance
      .get(`/api/meal/my-histories`)
      .then((response) => {
        const responseData = response.data.sort(
          (a, b) => a.historyId - b.historyId
        );
        const newMealStates = [];
        const newTimes = [];
        const newShowButton = responseData.map((item) => item.status);

        responseData.forEach((item) => {
          const serverTime = new Date(item.board.mealTime);
          const currentTime = new Date();
          const mealState = serverTime < currentTime;
          newMealStates.push(mealState);
          newTimes.push({ id: item.historyId, time: item.board.mealTime });
        });

        setMealStates(newMealStates);
        setTimes(newTimes);
        setData(responseData);
        setShowButton(newShowButton);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // 리뷰 작성하는 로직, 사람이 여러명일 수 있기에 맵으로 돌린 이전 리뷰들과 함께 객체 상태로 리뷰를 저장하도록 했다.
  const handleReviewChange = (historyId, e) => {
    const newReview = e.target.value;
    setUserReviews((prevReviews) => ({
      ...prevReviews,
      [historyId]: newReview,
    }));
  };

  // 리뷰 post 요청 보내는 곳. userId로 사람을 식별해서 객체 중 같은 아이디를 가진 리뷰를 유저 아이디쪽으로 보내도록 함.
  const handleReviewSubmit = (memberId) => {
    const comment = userReviews[memberId];
    const reCountHistoryId = historyFrontId + 1;

    axiosInstance
      .post(`/api/mypages/${memberId}/review`, {
        historyId: reCountHistoryId,
        comment,
        like: liked[memberId],
      })
      .then((response) => {
        alert('한줄평이 등록 되었습니다🙏');
      })
      .catch((error) => {
        alert('이미 평가한 사용자입니다.');
      });
  };

  // 좋아요 구현한 부분
  // 기존 : patch 메소드로 해당 유저의 like 값을 1 증가시키는 요청을 보내기
  const handleLike = (userId) => {
    const updatedLiked = [...liked];
    updatedLiked[userId] = !updatedLiked[userId];
    setLiked(updatedLiked);
  };

  // 팝업이랑 모달 관리하는 부분
  function handleOpen() {
    setSelectedPostIndex(null);
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

  // 버튼 눌렀을 때 실행
  function handlePopup(postMemberId, idx) {
    setPostId(postMemberId);
    setPopup(!popup);
    setSelectedPostIndex(idx);
    // 좋아요에서 필요함..
    setHistoryFrontId(postMemberId);
  }

  function handleModalTrue() {
    const memberId = postId + 1;
    if (postId !== null) {
      axiosInstance
        .patch(`/api/meal/histories/${memberId}`, {
          historyId: memberId,
          status: showButton[postId],
        })
        .then((response) => {
          // console.log('보내짐.', showButton[postId]);
          // 특정 게시글의 버튼 상태 변경
          const updatedShowButton = [...showButton];
          updatedShowButton[postId] = !updatedShowButton[postId];
          setShowButton(updatedShowButton);
          setModalEffect(true);
          setModal(!modal);
          setPopup(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
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

  // 시간을 메인처럼 변환하기
  const convertMealTime = (mealTime) => {
    const date = new Date(mealTime);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const meridiem = hours < 12 ? '오전' : '오후';
    const formattedHours = hours % 12 || 12;
    return `${month}/${day}일 ${meridiem} ${formattedHours}시`;
  };

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
          iconSrc="/svg/header-back.svg"
          fnc="back"
          scrollPosition={scrollPosition}
          scrollNumber={10}
        />

        {isLoading ? (
          <Loading />
        ) : (
          data && (
            <>
              <Posts>
                {data.length === 0 && (
                  <div className="none">참가한 식사가 없습니다.</div>
                )}
                {data.map((el, idx) => {
                  const isDisabled = buttonDisabled[el.id]; // 버튼의 활성화 상태 가져오기
                  const { title, mealTime, total } = el.board;
                  const convertedMealTime = convertMealTime(mealTime);

                  return (
                    <div
                      className={mealState[idx] ? 'post opacity' : 'post'}
                      key={idx}
                    >
                      <div
                        className={mealState[idx] ? 'complete' : 'before'}
                      ></div>
                      <div>
                        <ul>
                          <li>{title}</li>
                          <li>
                            <img src="svg/main-time.svg" alt="시간아이콘" />
                            <span>{convertedMealTime}</span>
                            <img src="svg/main-people.svg" alt="아이콘" />
                            <span>{total}</span>
                          </li>
                        </ul>
                      </div>
                      {!showButton[idx] && (
                        <button
                          onClick={() => {
                            scrollToTop();
                            handlePopup(el.historyId - 1, idx);
                          }}
                          disabled={isDisabled || !mealState[idx]}
                        >
                          {mealState[idx] ? (
                            <img src="svg/userstate-plus.svg" alt="확인버튼" />
                          ) : (
                            <img src="svg/userstate-minus.svg" alt="확인버튼" />
                          )}
                        </button>
                      )}
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
                    {selectedPostIndex !== null && (
                      <>
                        {data[selectedPostIndex].members
                          .filter((member) => member.memberId !== myPageId)
                          .map((member, idx) => {
                            const imageUrl = `https://api.sik-gu.com/api/mypages/${member.memberId}/image`;

                            return (
                              <div className="post" key={idx}>
                                <div>
                                  <img src={imageUrl} alt="프로필 이미지" />
                                  <div>
                                    <div>
                                      <div>{member.nickName}</div>
                                      <div>{member.introduce}</div>
                                    </div>
                                    <button
                                      onClick={() => {
                                        handleLike(member.memberId);
                                      }}
                                    >
                                      <img
                                        src={
                                          liked[member.memberId]
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
                                      onChange={(e) =>
                                        handleReviewChange(member.memberId, e)
                                      }
                                      maxLength="20"
                                    />
                                    <button
                                      onClick={() => {
                                        handleReviewSubmit(member.memberId);
                                      }}
                                    >
                                      확인
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </>
                    )}
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
