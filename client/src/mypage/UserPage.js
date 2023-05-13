import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Mobile,
  BackGround,
  BackYellow,
  Title,
  Profile,
  NewPosts,
  History,
} from '../style/MypageStyle';
import axios from 'axios';

const UserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    axios
      // 로그인 된 유저의 id를 어떻게 가져와야 할지.. API 문서가 있어야 알 거 같음.
      .get(`/members/${userId}`, {
        headers: {
          'Content-Type': `application/json`,
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then((response) => {
        setData(response.data);
        setLike(response.data.like);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleUser(userId) {
    navigate(`/members/${userId}`);
  }

  // 로그인 한 유저의 정보와 mypage 유저의 정보가 일치하는 조건문이 필요함.
  // 이 부분은 아무래도 얘기를 좀 더 해봐야할 거 같다.
  function handleLike() {
    setIsLiked(true);

    let copy = like;
    copy += 1;
    setLike(copy);
  }

  return (
    <>
      {data && (
        <Mobile>
          <BackGround>
            <BackYellow />
          </BackGround>
          <Title>
            <div></div>
            <div>Sik:Gu</div>
            <div>아이콘</div>
          </Title>
          <Profile>
            <div></div>
            <div>
              <ul>
                <li>
                  {data.nickname}
                  <button onClick={handleLike} disabled={isLiked}>
                    ♥
                  </button>
                </li>
                <li>{data.intro}</li>
                <li>
                  <ul>
                    <li></li>
                    <li>
                      <div>식구</div>
                      <div>{data.follower}</div>
                    </li>
                  </ul>
                  <ul>
                    <li></li>
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
                return (
                  <div key={idx}>
                    <ul>
                      <li>
                        <div></div>
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
                    <div></div>
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
      )}
    </>
  );
};

export default UserPage;
