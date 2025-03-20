import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: { products: [], total: 0},
    reducers: {
      addToCart: (state, action) => {
        const existingProduct = state.products.find(item => item.id === action.payload.id);
        
        if (existingProduct) {
          existingProduct.quantity += 1;
          existingProduct.total = existingProduct.quantity * existingProduct.price;
        } else {
          state.products.push({ ...action.payload, quantity: 1, total: action.payload.price });
        }
  
        state.total = state.products.reduce((total, item) => total + (item.quantity * item.price), 0);
      },
        removeFromCart: (state, action) => {
            const index = state.products.findIndex((product) => product.id === action.payload);
            if(index !== -1){
                state.total -= state.products[index].price;
                state.products.splice(index, 1);
            }
        }
    }
});

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;