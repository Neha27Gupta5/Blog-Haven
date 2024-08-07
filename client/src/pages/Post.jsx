import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import MainPosts from '../components/MainPosts';
import { Box, CircularProgress, styled } from '@mui/material';
import SimpleDrawer from '../components/SimpleDrawer';

const LoadingWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${'' /* height:80vh; */}
  margin:auto;
  margin-top:30vh;
  
`;


const GradientErrorMessage = styled('span')`
 
  color:rgba(255,255,255,0.8);
  font-size:1.8rem;
  font-weight:300;
`;

const GradientCircularProgress = () => {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#30cfd0" />
            <stop offset="100%" stopColor="#330867" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        size={60}
        sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
      />
      <GradientErrorMessage>Loading...</GradientErrorMessage>
    </React.Fragment>
  );
};

const ScreenBox = styled(Box)`
  background-color: rgba(0, 0, 0, 0.7);
  min-height: calc(100vh - 4rem);
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const MainPostBox = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

const HeaderBox = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;



const Post = () => {
  const [categorySelected, setCategorySelected] = useState('All');
  const [filter, setFilter] = useState('');
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postZero, setPostZero] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [prev,setprev]=useState('');

  const fetchPostWithKeyword = async (keyword) => {
    console.log('Fetching posts with keyword:', keyword); // Debug log
    setLoading(true);
    setPostZero(false);
  
    try {
      const response = await fetch('http://localhost:5000/blog/post/keyword', {
        // method: 'GET', // Ensure the correct method is used
        headers: {
          'Content-Type': 'application/json',
          'keyword': keyword, // Ensure keyword is properly sent
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
  
      const data = await response.json();
      console.log('Fetched posts:', data);
     
  
      if (data.length === 0) {
        setPostZero(true);
      } else {
        setPostData(data);
        setPostZero(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPostZero(true);
    } finally {
      setLoading(false);
      
    }
  };
  


  const handleSelect = (category) => {
    if(category===prev){
      setCategorySelected('new');
    }else{
      setCategorySelected(category);
    }
    
    console.log('Selected category:', category);
  };

  const handleSelectFilter = (filter) => {
    let sortedPosts = [...postData];
    if (filter === 'Recent') {
      sortedPosts.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    } else if (filter === 'Popular') {
      sortedPosts.sort((a, b) => b.likes - a.likes);
    }
    setFilter(filter);
    setPostData(sortedPosts);
  };

  const handleKeyWord = (keyword) => {
    setKeyword(keyword);
    fetchPostWithKeyword(keyword);
   setprev(categorySelected);
    console.log(keyword);
  
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (categorySelected === 'new') {
        setCategorySelected(prev);
        return;
      }
      // setLoading(true);
      // setPostZero(false);
      try {
        const response = await fetch('http://localhost:5000/blog/post/category', {
          headers: {
            'Content-Type': 'application/json',
            Category: categorySelected,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPostData(data);
        console.log( 'category wali post :',data);
        if (data.length === 0) {
          setPostZero(true);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPostZero(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [categorySelected]);

  return (
    <ScreenBox>
      <MainPostBox>
        <HeaderBox>
          <SimpleDrawer handleSelect={handleSelect} />
          <SearchBar handleSelect={handleKeyWord} />
          <Filter handleSelect={handleSelectFilter} />
        </HeaderBox>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: '100%',
            padding: '1rem',
          }}
        >
          {loading ? (
            <LoadingWrapper>
              <GradientCircularProgress />
            </LoadingWrapper>
          ) : postZero ? (
            
            
           <div style={
              {
                width:'100vw',
                display:'flex',
                justifyContent:'center',
                margin:'30vh',
                textTransform:'uppercase',
              }
            }>
            <GradientErrorMessage>Posts not found</GradientErrorMessage>
            </div>
            
          ) : (
            <MainPosts post={postData} />
          )}
        </Box>
      </MainPostBox>
    </ScreenBox>
  );
};

export default Post;


