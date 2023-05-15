// import { ModalTag } from '../style/ModalStyles';

// const ModalTagInput = ({ name, value, onChange }) => {
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       const tag = e.target.value.trim();
//       if (tag !== '') {
//         onChange({
//           target: {
//             name,
//             value: [...value.split(','), tag].join(','),
//           },
//         });
//         e.target.value = '';
//       }
//     }
//   };

//   const handleDeleteTag = (index) => {
//     onChange({
//       target: {
//         name,
//         value: value
//           .split(',')
//           .filter((_, i) => i !== index)
//           .join(','),
//       },
//     });
//   };

//   return (
//     <ModalTag>
//       {value.split(',').map((tag, index) => (
//         <ModalTagItem key={index}>
//           <ModalTagText>{tag}</ModalTagText>
//           <ModalTagCloseButton onClick={() => handleDeleteTag(index)}>
//             X
//           </ModalTagCloseButton>
//         </ModalTagItem>
//       ))}
//       <input
//         type="text"
//         name={name}
//         onKeyDown={handleKeyDown}
//         placeholder="태그를 입력하세요"
//       />
//     </ModalTag>
//   );
// };
// export default ModalTagInput;
