import React, { useEffect, useRef, useState } from 'react'
import {  NavLink, Outlet } from 'react-router-dom'
import getAllFlowers from '../services/Flowers';
import logo from '../logo1.png'
import { IconButton } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { countInCart } from '../states/cartSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -5,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 6px',
  },
}));

const Layout = (props) => {
  const secendMenuRef = useRef(null);
  const [productsList, setProductsList] = useState([])
  const countCart = useSelector(countInCart);


  const menuOut = () => {
    if (secendMenuRef.current) {
      secendMenuRef.current.style.display = 'none';
    }
  }
  const fetchData = async () =>{
    try {
      const Flowers = await getAllFlowers();
      setProductsList(Flowers)
    } catch (error) {
      console.log(error.massage)
    }
    }

  useEffect (() =>{
    fetchData()
  },[] )

  return (
    <>
      <div id='Menu'>
          <div id='navMenu'>
              <NavLink className='nav' to="/"><img className='logoImg' src={logo} alt='logoImg'></img></NavLink>
              <NavLink className='nav' to="/">   
                  <SvgIcon {...props} sx={{ fontSize: 30 }} >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </SvgIcon>
              </NavLink>
             
              <NavLink className='nav' to="/ourStory"> הסיפור שלנו</NavLink>
              <NavLink className='nav' to="/contact"> צור קשר</NavLink>
              
              <NavLink className='nav' to="/store" >החנות
              <div ref={secendMenuRef} id='secendMenu' onMouseOut={menuOut}>
                {productsList.map((c, index) => (
                  <div key={index}>
                    <NavLink className='listMenu' to={`/store/${c.name}`}>{c.name}</NavLink>
                  </div>
                ))}
              </div>
              </NavLink>
              
             <NavLink className='nav'to={"/cart"}> 
              <IconButton aria-label="cart">
                 <StyledBadge badgeContent={countCart} >
                    <ShoppingCartIcon />
                  </StyledBadge>
              </IconButton>
              </NavLink> 

          </div>
      </div>
      <Outlet/>
      <div id='Footer'>
          <NavLink className='navFooter' to="/"><img className='logoImgFooter' src={logo} alt='logoImg'></img></NavLink>
          <div id='navMenuFooter'>
              <NavLink className='navFooter' to="/">עמוד הבית</NavLink>
              <NavLink className='navFooter' to="/ourStory">הסיפור שלנו</NavLink>
              <NavLink className='navFooter' to="/contact">צור קשר</NavLink>
              <NavLink className='navFooter' to="/store"  >החנות </NavLink>
          </div>
      </div>
    </>
  )
}

export default Layout