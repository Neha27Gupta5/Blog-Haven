import React, { useState } from "react";
import { Box, styled, Typography, IconButton ,Tooltip} from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

const Drawer = styled(Box)(({ open }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: open ? '15vw' : '3.5vw',
  height: '100vh',
  transition: 'width 0.3s',
  '@media (max-width: 1200px)': {
    width: open ? '15vw' : '2vw',
  },
  '@media (max-width: 900px)': {
    width: open ? '16vw' : '7vw',
  },
  '@media (max-width: 600px)': {
    width: open ? '40vw' : '10vw',
  },
}));

const DrawerHeader = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 3rem;
  justify-content: space-between;
  align-items: center;
`;

const DrawerBody = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
`;

const ListItemTextStyled = styled(ListItemText)`
  padding-left: 1rem;
`;

const TypographyStyled = styled(Typography)`
  padding-left: 2rem;
`;

const IconButtonStyled = styled(IconButton)`
  margin-left: auto;
`;

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemTextStyled primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

const DrawerSide = () => {
  const [open, setOpen] = useState(true);

  const handleOpenClose = () => {
    setOpen(!open);
  };



  return (
    <Drawer open={open}>
      <DrawerHeader>
        {open && <TypographyStyled>Categories</TypographyStyled>}
        <IconButtonStyled onClick={handleOpenClose}>
        <Tooltip title="Choose Category" placement="top">
        {open ? <ChevronLeftIcon /> : < ChevronRightIcon/>}
        </Tooltip>
        </IconButtonStyled>
      </DrawerHeader>
      <DrawerBody>
        {open && (
          <FixedSizeList
            height={window.innerHeight - 3 * 16} 
            itemSize={46}
            itemCount={100}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        )}
      </DrawerBody>
    </Drawer>
  );
};

export default DrawerSide;
