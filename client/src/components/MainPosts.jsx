import React from 'react';
import { Grid, Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 600,
      between:800,
      laptop: 1024,
      desktop: 1280,
      large: 1400,
    },
  },
});

const MainPosts = ({ post }) => {
  const SkeletonCard = () => (
    <div className="card skeleton">
      <div className="card-photo skeleton" />
      <div className="card-categories skeleton">
        <span className="card-category skeleton" />
      </div>
      <div className="card-content skeleton">
        <h3 className="card-title skeleton" />
        <p className="card-author skeleton" />
        <p className="card-description skeleton" />
        <div className="card-info skeleton">
          <span className="card-likes skeleton" />
          <span className="card-views skeleton" />
        </div>
      </div>
    </div>
  );

  const BoxCard = styled(Box)`
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    border-radius:5px;
  `;

  const Card = ({ id, photo, categories, title, description, likes, views, author }) => {
    const maxLength = 90;
    const isLongDescription = description.length > maxLength;
    const truncatedDescription = isLongDescription ? `${description.substring(0, maxLength)}...` : description;

    return (
      <div className="card" style={{ width: '100%', height: '20rem'}}>
        <div style={{ width: '100%', height: '40%' }}>
          <Link to={`/details/${id}`} style={{ textDecoration: 'none' }}>
            <img src={photo} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Link>
        </div>
        <div className="card-categories">
          {categories.map((category, index) => (
            <span key={index} className="card-category"  >
              {category}
            </span>
          ))}
        </div>
        <div className="card-content" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <h3 className="card-title"  >
            {title}
          </h3>
          <p className="card-author">by {author}</p>
          <p className="card-description" style={{
            height: '4rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            wordBreak: 'break-word',
            wordWrap: 'break-word',
          }}>
            {truncatedDescription}
          </p>
        </div>
      </div>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ width: '100%',
      // padding:'2rem',
      overflow:'hidden',
      minHeight:'85vh',
      // backgroundColor:'red',
      }}>
        <Grid container zeroMinWidth spacing={2} display="flex" justifyContent="flex-start" alignItems="center">
          {post.length === 0 ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Grid item mobile={12} tablet={6} between ={ 4} laptop={3} desktop={3} large={2} key={index}>
                <SkeletonCard />
              </Grid>
            ))
          ) : (
            post.map((post) => (
              <Grid item mobile={12} tablet={6} between={4} laptop={3} desktop={3} large={2} key={post._id}>
                <BoxCard>
                  <Card
                    id={post._id}
                    photo={post.picture
                     ? post.picture
                     : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'}
                    categories={[post.categories]} // Ensure categories is always an array
                    title={post.title}
                    description={post.description}
                    likes={post.likes}
                    views={post.views}
                    author={post.Name}
                  />
                </BoxCard>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default MainPosts;
