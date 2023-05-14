/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Mobile,
  BackGround,
  BackYellow,
  Title,
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
  const [isActive, setIsActive] = useState(false);
  const [popup, setPopup] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axios
      // 로그인 된 유저의 id를 어떻게 가져와야 할지.. API 문서가 있어야 알 거 같음.
      .get('http://localhost:3001/state')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get('/members/all', {
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
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
    if (popup) {
      setPopup(false);
    } else if (modal) {
      setModal(false);
    } else {
      setIsOpen(false);
    }
  }

  function handlePopup(postId) {
    setPostId(postId);
    setPopup(!popup);
  }

  function handleModalTrue() {
    setData((prevData) =>
      prevData.map((el) => (el.id === postId ? { ...el, state: true } : el))
    );

    setIsActive(postId);
    setModal(!modal);
    setPopup(false);
  }

  function handleModalFalse() {
    // 거절 버튼 눌렀을 경우
    setModal(false);
    setPopup(false);
  }

  return (
    <>
      {data && user && (
        <Mobile>
          <BackGround>
            <BackYellow />
          </BackGround>
          <Title>
            <div></div>
            <div>Sik:Gu</div>
            <div>아이콘</div>
          </Title>
          <Posts>
            {data.map((el, idx) => {
              const isDisabled = isActive === el.id || postId === el.id;
              return (
                <div className="post" key={idx}>
                  <div className={el.state ? 'complete' : 'before'}></div>
                  <div>
                    <ul>
                      <li>{el.title}</li>
                      <li>
                        <span>{el.date}</span>
                        <span>{el.time}</span>
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => handlePopup(el.id)}
                    disabled={isDisabled || el.state}
                  >
                    〉
                  </button>
                </div>
              );
            })}
          </Posts>
          <PopUp className={popup && isOpen ? '' : 'hide'} onClick={handleOpen}>
            <div
              role="button"
              tabIndex={0}
              onClick={(e) => e.stopPropagation()}
            >
              <ul>
                <li>
                  <h3>완료되셨나요?</h3>
                </li>
                <li>어쩌구저쩌구..어쩌구저쩌구..</li>
                <li>
                  <button onClick={handleModalTrue}>수락</button>
                  <button onClick={handleModalFalse}>거절</button>
                </li>
              </ul>
            </div>
          </PopUp>
          <Modal className={modal && isOpen ? '' : 'hide'} onClick={handleOpen}>
            <div
              role="button"
              tabIndex={0}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="header">
                <div></div>
                <div>
                  <h3>좋은 식구들을 만나셨나요?</h3>
                  <span>식구들을 평가해주세요.</span>
                </div>
              </div>
              {user.map((el, idx) => {
                return (
                  <div className="post" key={idx}>
                    <div>
                      <div></div>
                      <div>
                        <div>
                          <div>{el.nickname}</div>
                          <div>{el.intro}</div>
                        </div>
                        <button
                          onClick={() => handleLike(el.id)}
                          disabled={likeClicked}
                        >
                          👍🏻
                        </button>
                      </div>
                      <div>
                        <input
                          placeholder="한 줄 평가를 입력하세요."
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
        </Mobile>
      )}
    </>
  );
};

export default UserState;
