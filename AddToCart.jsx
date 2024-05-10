
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setAddToCart } from '../states/cartSlice';
import Loader from './Loader';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import getAllFlowers from '../services/Flowers';

const AddToCart = () => {
    const dispatch = useDispatch();
    const { name } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState();
    const [isLoad, setIsLoad] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
      try {
        const Flowers = await getAllFlowers();
        const foundItem = Flowers.find(f => f.name === name);
        foundItem ? setItem(foundItem) : navigate("/");
        
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoad(false);
  }
    }
    useEffect(() => {
      fetchData()
    }, [])

    const handleClick = () => {
        if (item) {
            dispatch(setAddToCart(item));
            toast.success("מוצר נוסף בהצלחה לסל");
        }
    };

    if(error){
      return <div> Error: {error}</div>;
    }   

    return (
        <div>
            {isLoad ? <Loader/> : (
                <>
                 <Button 
                  onClick={handleClick} variant="outlined" startIcon={<AddShoppingCartIcon />}>
                 הוסף לסל
               </Button>
                </>
            )}
        </div>
    );
};

export default AddToCart;
