// import React, { useState } from 'react';
// import styled from 'styled-components';

// const CarouselContainer = styled.div`
//   display: flex;
//   overflow: hidden;
//   width: 100%;
//   max-width: 600px;
//   margin: auto;
//   position: relative;
// `;

// const CarouselWrapper = styled.div`
//   display: flex;
//   transition: transform 0.5s ease;
//   transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
// `;

// const Card = styled.div`
//   min-width: 100%;
//   box-sizing: border-box;
//   padding: 20px;
//   background: #f0f0f0;
//   border: 1px solid #ddd;
//   margin: 10px;
// `;

// const Button = styled.button`
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   background-color: rgba(255, 255, 255, 0.7);
//   border: none;
//   cursor: pointer;
//   padding: 10px;
//   z-index: 1;
// `;

// const PrevButton = styled(Button)`
//   left: 0;
// `;

// const NextButton = styled(Button)`
//   right: 0;
// `;

// const Carousel = ({ items }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) <= 0 ? 0 : (prevIndex - 1 + items.length) % items.length);
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
//   };

//   return (
//     <CarouselContainer>
//       <CarouselWrapper currentIndex={currentIndex}>
//         {items.map((item, index) => (
//           <Card key={index}>{item}</Card>
//         ))}
//       </CarouselWrapper>
//       <PrevButton onClick={handlePrev}>{'<'}</PrevButton>
//       <NextButton onClick={handleNext}>{'>'}</NextButton>
//     </CarouselContainer>
//   );
// };

// export default Carousel;
