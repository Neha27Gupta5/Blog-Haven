import React from 'react'
import Carousell from '../components/Carousell'
import PopularPost from '../components/RecentPost';
import BlogIntro from '../pages/BlogIntro';
import Footer from '../components/Footer';


const Home = () => {
  return (
    
    <>
        <Carousell/>
        <BlogIntro/>
        <PopularPost/>
        <Footer/>
    </>
  )
}

export default Home