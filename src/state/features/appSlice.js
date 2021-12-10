import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: { rommId: null },
  reducers: {
    enterRoom: (state, action) => {
      state.roomId = action.payload.roomId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { enterRoom } = appSlice.actions;

// Select the state you want to keep track of
export const selectRoomId = state => state.app.roomId;

//Export the mailSlice as a reducer:
export default appSlice.reducer;
