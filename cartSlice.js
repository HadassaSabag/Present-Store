
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sum: 0,
    arr: [],
    count: 0
}

const cartSlice = createSlice(
    {
        name: "thaCart",
        initialState,
        reducers:{
            setAddToCart: (state, action) => {
                const existingItem = state.arr.find(item => item.name === action.payload.name);
                if (existingItem) {
                    existingItem.quantity += 1;        

                } else {
                    state.arr.push({ ...action.payload, quantity: 1 });      
                              state.count++

                }
                state.sum += action.payload.price;

            },
            setAddToWishList: (state, action) => {
                const existingItem = state.arr.find(item => item.name === action.payload.name);
                if (existingItem) {
                    existingItem.quantity += 1;        

                } else {
                    state.arr.push({ ...action.payload, quantity: 1 });      
                              state.count++
                }
                state.sum += action.payload.price;
            },

            setRemoveFromCart: (state, action) => {
                const itemName = action.payload;
                const itemToRemove = state.arr.find(item => item.name === itemName);
                if (itemToRemove) {
                    state.sum -= itemToRemove.price * itemToRemove.quantity;
                    state.count--
                    state.arr = state.arr.filter(item => item.name !== itemName);
                }
            },
            setRemoveFromWishList: (state, action) => {
                const itemName = action.payload;
                const itemToRemove = state.arr.find(item => item.name === itemName);
                if (itemToRemove) {
                    state.sum -= itemToRemove.price * itemToRemove.quantity;
                    state.count--
                    state.arr = state.arr.filter(item => item.name !== itemName);
                }
            },
            setUpdateQuantity: (state, action) => {
                const { name, quantity } = action.payload;
                const itemToUpdate = state.arr.find(item => item.name === name);
                if (itemToUpdate) {
                    const priceDiff = (quantity - itemToUpdate.quantity) * itemToUpdate.price;
                    itemToUpdate.quantity = quantity;
                    state.sum += priceDiff;
                }
            }
        }
    }
);

export const { setAddToCart, setRemoveFromCart,setAddToWishList, setRemoveFromWishList, setUpdateQuantity } = cartSlice.actions;
export const thaCart = (state) => state.toCart.arr;
export const CartSum = (state) => state.toCart.sum;
export const countInCart = (state) => state.toCart.count;


export default cartSlice.reducer;

