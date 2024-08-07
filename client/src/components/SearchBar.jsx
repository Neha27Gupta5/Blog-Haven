import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// Styled TextField using styled component
const TextStyled = styled(TextField)(({ theme }) => ({
  background: 'rgba(0,0,0,0)',
  border: '0.8px white solid',
  borderRadius: '4px',
  '& .MuiInputBase-input': {
    color: 'white',
  },
}));

// Styled IconButton using styled component
const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    color: 'grey', // Change color on hover
  },
}));

const SearchIconStyled = styled(SearchIcon)(({ theme }) => ({
  color: 'white',
  '&:hover': {
    color: 'black', // Change color on hover
  },
}));

const SearchBar = ({ handleSelect }) => {
  
  const [searchItem, setSearchItem] = useState('');

  const handleChange = (e) => {
    const text = e.target.value;
    setSearchItem(text);
  };
  
  const handleSearchClick = () => {
    handleSelect(searchItem);
    setSearchItem(''); // Clear the search field after selection
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <TextStyled
      variant="outlined"
      placeholder="Search"
      value={searchItem}
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButtonStyled onClick={handleSearchClick}>
              <SearchIconStyled  />
            </IconButtonStyled>
          </InputAdornment>
        ),
      }}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export default SearchBar;
