import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    orders: null,
};



export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        loadOrders: (state, action) => {
            state.orders = action.payload
        }
    },

});

export const { loadOrders } = ordersSlice.actions;

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

export const selectOrders = state => state.orders;

export const selectNumberOfOrders = state => state.orders.orders ? state.orders.orders?.length : 0;


export default ordersSlice.reducer;
