import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  fanFollower: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    togglefanFollower(state, action) {
      const { user_id } = action.payload;
      const idx = state.fanFollower.findIndex(e => e === user_id);
      if (idx === -1) {
        state.fanFollower.push(user_id);
      } else {
        state.fanFollower.splice(idx, 1);
      }
    },
  },
});

export const { togglefanFollower } = userSlice.actions;

// Memoized selector
const selectFanFollower = (state) => state.users.fanFollower;

export const isFan = createSelector(
  [selectFanFollower, (state, u_id) => u_id],
  (fanFollower, u_id) => fanFollower.includes(u_id)
);

export default userSlice.reducer;
