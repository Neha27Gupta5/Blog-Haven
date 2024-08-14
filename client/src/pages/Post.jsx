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
  margin: auto;
  margin-top: 30vh;
`;

const GradientErrorMessage = styled('span')`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.8rem;
  font-weight: 300;
`;

const GradientCircularProgress = () => (
  <>
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
  </>
);

const ScreenBox = styled(Box)`
  background-color: rgba(0, 0, 0, 0.7);
  min-height: calc(100vh - 4rem);
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
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postZero, setPostZero] = useState(false);
  const [keyword, setKeyword] = useState('');

  const fetchPosts = async (url, headers) => {
    setLoading(true);
    setPostZero(false);
    try {
      const response = await fetch(url, { headers });
      if (!response.ok) throw new Error('Failed to fetch posts');

      const data = await response.json();
      if (data.length === 0) setPostZero(true);
      setPostData(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPostZero(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (category) => {
    setKeyword(''); // Reset keyword when category changes
    setCategorySelected(category);
  };

  const handleSelectFilter = (filter) => {
    let sortedPosts = [...postData];
    if (filter === 'Recent') {
      sortedPosts.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    } else if (filter === 'Popular') {
      sortedPosts.sort((a, b) => b.likes - a.likes);
    }
    setPostData(sortedPosts);
  };

  const handleKeyWord = (keyword) => {
    setKeyword(keyword);
    fetchPosts('https://blog-haven.onrender.com/blog/post/keyword', {
      'Content-Type': 'application/json',
      'keyword': keyword,
    });
  };

  useEffect(() => {
    if (keyword) return; // If keyword search is active, don't fetch category-based posts

    const url = 'https://blog-haven.onrender.com/blog/post/category';
    const headers = { 'Content-Type': 'application/json', 'Category': categorySelected };
    fetchPosts(url, headers);
  }, [categorySelected, keyword]); // Added 'keyword' as a dependency

  return (
    <ScreenBox>
      <MainPostBox>
        <HeaderBox>
          <SimpleDrawer handleSelect={handleSelect} />
          <SearchBar handleSelect={handleKeyWord} />
          <Filter handleSelect={handleSelectFilter} />
        </HeaderBox>
        <Box style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', padding: '1rem' }}>
          {loading ? (
            <LoadingWrapper>
              <GradientCircularProgress />
            </LoadingWrapper>
          ) : postZero ? (
            <div
              style={{
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                margin: '30vh',
                textTransform: 'uppercase',
              }}
            >
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
