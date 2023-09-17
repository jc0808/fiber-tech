import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: null,
};



export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state, action) => {
      state.user = null;
    },
    updateDisplayName: (state, action) => {
      state.user = action.payload
    },
    updateEmail: (state, action) => {
      state.user = action.payload;
    }
  },

});

export const { login, logout, updateDisplayName, updateEmail } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
