import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Mobile,
  BackGround,
  BackYellow,
  Profile,
  NewPosts,
  History,
  PostIcon,
  NotFound,
} from '../style/MypageStyle';
import axiosInstance from '../axiosConfig';

const MyPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const imageUrl = `https://api.sik-gu.com/api/mypages/${userId}/image`;

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  const mobileContainerRef = useRef(null);

  useEffect(() => {
    axiosInstance
      .get(`/api/mypages/${userId}`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [userId]);

  // 수정 페이지로 들어가기
  function handleEdit() {
    navigate(`/editprofile/${userId}`);
  }

  // 다른 유저 페이지로 들어가기
  function handleUser(user) {
    // navigate(`/userpage/${user}`, { state: { from: userId } });
    navigate(`/userpage/${user}`);
  }

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
          data && (
            <>
              <Profile>
                <img src={imageUrl} alt="프로필 이미지" />
                <div>
                  <ul>
                    <li>
                      {data.nickname}
                      <button onClick={handleEdit}>
                        <img src="/svg/mypage-edit.svg" alt="수정버튼" />
                      </button>
                    </li>
                    <li>{data.introduce ? data.introduce : null}</li>
                    <li>
                      <ul>
                        <li>
                          <img src="/svg/mypage-follow.svg" alt="식구" />
                        </li>
                        <li>
                          <div>식구</div>
                          <div>{data.followerCount}</div>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <img src="/svg/mypage-like.svg" alt="친구" />
                        </li>
                        <li>
                          <div>좋아요</div>
                          <div>{data.likes}</div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </Profile>
              <NewPosts>
                <h3>최근 작성한 게시글</h3>
                <div className={data.recentBoard.length === 0 ? '' : 'post'}>
                  {data.recentBoard.length !== 0 ? (
                    data.recentBoard.slice(0, 2).map((el, idx) => {
                      const community = '/svg/mypage-community.svg';
                      const sikgu = '/svg/mypage-sikgu.svg';

                      return (
                        <div key={idx}>
                          <ul>
                            <li>
                              <PostIcon
                                isType={el.type}
                                imageA={sikgu}
                                imageB={community}
                              />
                            </li>
                            <li>{el.createdAt}</li>
                            <li>{el.title}</li>
                          </ul>
                        </div>
                      );
                    })
                  ) : (
                    <NotFound>
                      <div>작성한 게시글이 존재하지 않습니다.</div>
                    </NotFound>
                  )}
                </div>
              </NewPosts>
              <History>
                <h3>식구랑 먹었던 이력</h3>
                {data.recentReview.length !== 0 ? (
                  <div className={data.review ? '' : 'post'}>
                    {data.recentReview.slice(0, 4).map((el, idx) => {
                      return (
                        <div key={idx}>
                          <img
                            src={`https://api.sik-gu.com/api/mypages/${el.reviewerId}/image`}
                            alt="프로필 이미지"
                          />
                          <div>
                            <ul>
                              <li>{el.reviewerNickName}</li>
                              <li>{el.reviewContent}</li>
                            </ul>
                          </div>
                          <button
                            onClick={() => {
                              handleUser(el.reviewerId);
                            }}
                          >
                            +
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <NotFound>
                    <div>식구랑 먹었던 이력이 존재하지 않습니다.</div>
                  </NotFound>
                )}
              </History>
            </>
          )
        )}
      </Mobile>
      <Footer activeIcon="mypage" />
    </>
  );
};

export default MyPage;
