import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import '../Styles/Swiper.css'; 
import { Pagination } from 'swiper/modules';
import { Typography, styled, Button, CircularProgress } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const StyledTypography = styled(Typography)`
  color: white;
  font-size: 2.5rem;
  font-weight: 300;
  margin-bottom: 1rem;
`;

const StyledButton = styled(Button)`
  background-image: linear-gradient(to top, #30cfd0, #330867);
  color: white;
  &:hover {
    background-image: linear-gradient(to top, #330867, #30cfd0);
  }
`;

const LoadingWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const GradientText = styled('span')`
  background: linear-gradient(to top, #30cfd0, #330867);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 1rem;
  margin-top: 0.5rem;
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
        size={60}  // Adjust size as needed
        sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
      />
      <GradientText>Loading...</GradientText>
    </React.Fragment>
  );
};

const ErrorMessage = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
`;

const GradientErrorMessage = styled('span')`
  background: linear-gradient(to top, #30cfd0, #330867);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 1.5rem;
  margin-top: 0.5rem;
`;

const Recentpost = () => {
  const [posts, setPosts] = useState([]);
  const [postError, setPostError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/blog/PopularPost');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
        setLoading(false);
        if (data.length === 0) {
          setPostError(true);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
        setPostError(true);
      }
    };

    fetchPosts();
  }, []);

  const handleViewMore = () => {
    navigate('/posts');
  };

  return (
    <div style={{
      backgroundColor: 'rgba(0,0,0,0.7)',
      width: '100%',
      padding: '1rem',
      marginTop: '0',
      borderStyle: 'none',
    }}>
      <StyledTypography variant="h1">Recent Posts</StyledTypography>
      <Swiper
         style={{ 
    height: (postError || loading) ? '100%' : '25rem',
  }}
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
        breakpoints={{
          400: { slidesPerView: 2, spaceBetween: 20 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
          1280: { slidesPerView: 4, spaceBetween: 50 },
          1440: { slidesPerView: 5, spaceBetween: 50 },
          1800: { slidesPerView: 6, spaceBetween: 60 },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {loading ? (
          <LoadingWrapper>
            <GradientCircularProgress />
          </LoadingWrapper>
        ) : postError ? (
          <ErrorMessage>
            
            <GradientErrorMessage>Posts not found</GradientErrorMessage>

          </ErrorMessage>
        ) : (
          <>
            {posts.slice(0, 10).map((post) => (
              <SwiperSlide key={post._id}>
                <Card
                  id={post._id}
                  photo={ post.picture
                     ? post.picture
                     : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'}
                  categories={[post.categories]} 
                  title={post.title}
                  description={post.description}
                  likes={post.likes}
                  views={post.views}
                  author={post.Name}
                />
              </SwiperSlide>
            ))}
            {posts.length > 2 && (
              <SwiperSlide style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0)',
                height: '21rem',
              }}>
                <StyledButton
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2 }}
                  onClick={handleViewMore}
                >
                  View more
                </StyledButton>
              </SwiperSlide>
            )}
          </>
        )}
      </Swiper>
    </div>
  );
};

const Card = ({ id, photo, categories, title, description, likes, views, author }) => {
  const maxLength = 90;
  const isLongDescription = description.length > maxLength;
  const truncatedDescription = isLongDescription ? `${description.substring(0, maxLength)}...` : description;

  return (
    <div className="card" style={{ width: '288px', height: '20rem' }}>
      <div style={{ width: '100%', height: '40%' }}>
        <Link to={`/details/${id}`} style={{ textDecoration: 'none' }}>
          <img src={photo} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Link>
      </div>
      <div className="card-categories">
        {categories.map((category, index) => (
          <span key={index} className="card-category">{category}</span>
        ))}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-author">by {author}</p>
        <p className="card-description" style={{
          height: '4rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 3,
        }}>
          {truncatedDescription}
        </p>
      </div>
    </div>
  );
};

export default Recentpost;
