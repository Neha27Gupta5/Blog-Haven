import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './ExampleCarouselImage';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Carousell.css'; // Import the custom CSS file

function Carousell() {
  const categories = [
    { title: 'Food', imageUrl: './image/category/food.png' },
    { title: 'Health', imageUrl: './image/category/Health.png' },
    { title: 'Science', imageUrl: './image/category/science.png' },
    { title: 'Sports', imageUrl: './image/category/sports.png' },
    { title: 'Tech', imageUrl: './image/category/Technology.png' },
    { title: 'Travel', imageUrl: './image/category/Travel.png' },
    { title: 'Movie', imageUrl: './image/category/Designer.png' },
    { title: 'Art', imageUrl: './image/category/art.png' },
  ];

  return (
    <Carousel variant="dark" indicators={true} slide={true}>
      {categories.map((category, index) => (
        <Carousel.Item key={index} interval={2000}>
          <ExampleCarouselImage 
            text={category.title} 
            backgroundImage={category.imageUrl} 
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carousell;
