import Footer from './Footer';
import Header from './Header';
import Loding from './Loding';
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
} from '../style/MypageStyle';
import axios from 'axios';

const MyPage = () => {
  const { myId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/mypage/${myId}`, {
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [myId]);

  function handleEidt() {
    navigate('/editprofile');
  }

  function handleUser(userId) {
    // 다른 유저는 연필모양 대신 팔로우 모양이 있고, 누르면 팔로우가 오르게 해야한다. (05/19 기준 팔로우로 바꿈.)
    navigate(`/api/mypage/${userId}`);
  }

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = document.getElementById('mobileContainer').scrollTop;
      setScrollPosition(position);
    };

    const mobileContainer = document.getElementById('mobileContainer');
    if (mobileContainer) {
      mobileContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mobileContainer) {
        mobileContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [data]);

  return (
    <>
      <Mobile id="mobileContainer">
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
          <Loding />
        ) : (
          data && (
            <>
              <Profile>
                <img src={data.img} alt="프로필 이미지" />
                <div>
                  <ul>
                    <li>
                      {data.nickname}
                      <button onClick={handleEidt}>
                        <img src="/svg/mypage-edit.svg" alt="수정버튼" />
                      </button>
                    </li>
                    <li>{data.introduce}</li>
                    <li>
                      <ul>
                        <li>
                          <img src="/svg/mypage-like.svg" alt="식구" />
                        </li>
                        <li>
                          <div>식구</div>
                          <div>{data.followerCount}</div>
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
                <div className="post">
                  {data.recentBoard.slice(0, 2).map((el, idx) => {
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
                  })}
                </div>
              </NewPosts>
              <History>
                <h3>식구랑 먹었던 이력</h3>
                <div className="post">
                  {data.review.map((el, idx) => {
                    return (
                      <div key={idx}>
                        <img src={el.img} alt="프로필 이미지" />
                        <div>
                          <ul>
                            <li>{el.name}</li>
                            <li>{el.comment}</li>
                          </ul>
                        </div>
                        <button
                          onClick={() => {
                            handleUser(el.id);
                          }}
                        >
                          +
                        </button>
                      </div>
                    );
                  })}
                </div>
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
