import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    products: null,
};



export const productsSlice = createSlice({
    name: 'products',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        loadProducts: (state, action) => {
            state.products = action.payload
        }
    },

});

export const { loadProducts } = productsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//         dispatch(incrementByAmount(amount));
//     }
// };

export const selectProducts = state => state.products;

export default productsSlice.reducer;
