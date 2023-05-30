import Footer from './Footer';
import Header from './Header';
import Loading from './Loading';
import { useState, useEffect } from 'react';
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

const UserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  // const location = useLocation();
  // const { from } = location.state;

  const [data, setData] = useState();
  const [follow, setFollow] = useState();
  const [isFollower, setIsFollower] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = sessionStorage.getItem('jwt');
  const imageUrl = `https://api.sik-gu.com/api/mypages/${userId}/image`;

  useEffect(() => {
    // const header = {
    //   headers: {
    //     'Content-Type': `application/json`,
    //     Authorization: `${accessToken}`,
    //   },
    // };

    axiosInstance
      .get(`/api/mypages/${userId}`)
      .then((response) => {
        setIsFollower(response.data.followingCurrentUser);
        setData(response.data);
        setIsLoading(false);
        setFollow(response.data.followerCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  function handleUser(user) {
    navigate(`/userpage/${user}`);
  }

  // 팔로우 기능 구현
  function handleFollow() {
    if (!isFollower) {
      setIsFollower(true);
      axiosInstance
        .post(
          `/api/mypages/${userId}/follow`,
          {},
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        )
        .then((response) => {
          let copy = follow;
          copy += 1;
          setFollow(copy);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsFollower(false);
      axiosInstance
        .post(
          `/api/mypages/${userId}/unfollow`,
          {},
          {
            headers: {
              Authorization: `${accessToken}`,
            },
          }
        )
        .then((response) => {
          let copy = follow;
          copy -= 1;
          setFollow(copy);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      <Mobile>
        <BackGround>
          <BackYellow />
        </BackGround>
        <Header iconSrc="/svg/header-logout.svg" fnc="logout" />
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
                      <button onClick={handleFollow}>
                        <img
                          src={
                            isFollower
                              ? '/svg/mypage-followhandle-2.svg'
                              : '/svg/mypage-followhandle.svg'
                          }
                          alt="좋아요버튼"
                        />
                      </button>
                    </li>
                    <li>{data.intro}</li>
                    <li>
                      <ul>
                        <li>
                          <img src="/svg/mypage-like.svg" alt="식구" />
                        </li>
                        <li>
                          <div>식구</div>
                          <div>{follow}</div>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <img src="/svg/mypage-follow.svg" alt="친구" />
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
                      console.log(el);
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

export default UserPage;
