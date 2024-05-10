
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getAllFlowers from '../services/Flowers';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 350,
  width: 350,
  margin: '40px', 
marginLeft:'90px',
  borderRadius: '20px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 200,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiTypography-root': {
      border: '1px solid black',
      backgroundColor: 'white',
      color: 'black',
      borderRadius: '20px',
      opacity: 0.6, 
    },
  },
}));


const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'auto', 
  backgroundPosition: 'center',
});


const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.black,
  border: '1px solid black',
  borderRadius: '20px',
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 20,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const Store = () => {
  const [productsList, setProductsList] = useState([]);

  const fetchData = async () => {
    try {
      const Flowers = await getAllFlowers();
      setProductsList(Flowers);
      console.log(Flowers);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
             <h1>הפרחים שלנו</h1>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {productsList.map((p, index) => (
        <ImageButton
          focusRipple
          key={index}
          style={{
            backgroundImage: `url(${p.img})`,
          }}
          component={Link}
          to={p.name}
        >
          <ImageSrc />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                backgroundColor: 'pink',
                color: 'black',
                borderRadius: '20px',
                opacity: 0.8, 
              }}
            >
              {p.name}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
    </>
  );
};

export default Store;

