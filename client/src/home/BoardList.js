// // BoardList.js
// import { BoardsWrap } from './HomeStyle';

// import { useSelector, useDispatch } from 'react-redux';
// import { selectFilteredBoards, setSearchTerm } from '../store/boardSlice';
// import Board from './Board';

// const BoardList = () => {
//   const dispatch = useDispatch();
//   const filteredBoards = useSelector(selectFilteredBoards);

//   // 검색어 입력 핸들러
//   const handleSearch = (e) => {
//     dispatch(setSearchTerm(e.target.value));
//   };

//   return (
//     <div>
//       <input type="text" placeholder="Search..." onChange={handleSearch} />
//       {filteredBoards.map((board) => (
//         <Board key={board.id} board={board} />
//       ))}
//     </div>
//   );
// };

// export default BoardList;
