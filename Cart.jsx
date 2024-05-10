
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  NavLink } from 'react-router-dom';
import { setRemoveFromCart, setUpdateQuantity, thaCart, CartSum } from '../states/cartSlice';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Checkbox, Fab, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Rimov from '@mui/icons-material/Remove'
import { Favorite, FavoriteBorder } from '@mui/icons-material';


const Cart = () => {
    const dispatch = useDispatch(); 
    const sumCart = useSelector(CartSum);   
    const arrCart = useSelector(thaCart);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleRemoveFromCart = (itemName) => {
        dispatch(setRemoveFromCart(itemName));
        toast.error("מוצר הוסר בהצלחה מהסל");
    };

    const handleUpdateQuantity = (itemName, newQuantity) => {
        dispatch(setUpdateQuantity({ name: itemName, quantity: newQuantity }));
    };

    return (
        <div 
        className='boxContant'>
            <div className='contant'>
                <div id='myCart'>
                    <h4 className='h4'>העגלה שלי </h4>
                    {arrCart.map((p, index) => (
                        <div key={index} id='productCart'>
                            <div id='myCartContant'>
                                <img id='productImgCart' src={p.img} alt={p.fullName}></img>
                                <div id='productDataCart'>
                                    <h5 className='h5'>{p.fullName}</h5>
                                    <p className='itemDataCart'>₪{p.price} :מחיר </p>
                                    <p className='itemDataCart'> על המוצר : {p.information} </p>
                                    <IconButton onClick={() => handleRemoveFromCart(p.name)} aria-label="delete"> <DeleteIcon /> </IconButton>
                                    <Checkbox {...label} icon={<FavoriteBorder color='error'/>}   checkedIcon={<Favorite color='error' />} />
                                </div>
                                <div className='itemDataCart'>
                                    
                                    <Fab onClick={() => handleUpdateQuantity(p.name, p.quantity + 1)} size="small"  aria-label="add">
                                        <AddIcon />
                                    </Fab>
                                    <b>{ " "+ p.quantity+" "  }</b>
                                    
                                    <Fab onClick={() => handleUpdateQuantity(p.name, Math.max(p.quantity - 1, 1))} size="small"  aria-label="remuv">
                                        <Rimov />
                                    </Fab>

                                </div>
                                <div className='itemDataCart'>
                                    ₪{p.quantity * p.price}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div id='orderSummary'>
                    <h4 className='h4'>ההזמנות שלך</h4>
                    <p className='h5'>₪{sumCart} :סה"כ </p>
                    {arrCart.length > 0 && (
               
                <NavLink to='/payment'>
                <Button variant="contained" endIcon={<SendIcon />}>
                להזמנה ומעבר לתשלום 
                </Button></NavLink>
            )}

                </div>
            </div>
        </div>
    );
};

export default Cart;
