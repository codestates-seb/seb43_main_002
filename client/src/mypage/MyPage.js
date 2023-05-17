import Footer from './Footer';
import Header from './Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const [data, setData] = useState();

  useEffect(() => {
    axios
      // 로그인 된 유저의 id를 어떻게 가져와야 할지.. API 문서가 있어야 알 거 같음.
      .get('http://localhost:3001/members/1', {
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleEidt() {
    navigate('/editprofile');
  }

  function handleUser(userId) {
    // 다른 유저는 연필모양 대신 하트모양이 있고, 누르면 like가 오르게 해야한다.
    navigate(`/members/${userId}`);
  }

  // 로그인 한 유저의 정보와 mypage 유저의 정보가 일치하는 조건문이 필요함.
  // 이 부분은 아무래도 얘기를 좀 더 해봐야할 거 같다.

  return (
    <>
      {data && (
        <>
          <Mobile>
            <BackGround>
              <BackYellow />
            </BackGround>
            <Header iconSrc="/svg/header-logout.svg" />
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
                  <li>{data.intro}</li>
                  <li>
                    <ul>
                      <li>
                        <img src="/svg/mypage-like.svg" alt="식구" />
                      </li>
                      <li>
                        <div>식구</div>
                        <div>{data.follower}</div>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <img src="/svg/mypage-follow.svg" alt="친구" />
                      </li>
                      <li>
                        <div>좋아요</div>
                        <div>{data.like}</div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </Profile>
            <NewPosts>
              <h3>최근 작성한 게시글</h3>
              <div className="post">
                {data.recently.slice(0, 2).map((el, idx) => {
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
                        <li>{el.date}</li>
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
          </Mobile>
          <Footer activeIcon="mypage" />
        </>
      )}
    </>
  );
};

export default MyPage;
