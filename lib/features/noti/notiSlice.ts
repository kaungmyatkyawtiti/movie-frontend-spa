import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export type NotiState = {
  message: string | null;
}

const initialState: NotiState = {
  message: null,
}

export const notiSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: (create) => ({
    showNoti: create.reducer((state, action: PayloadAction<string>) => {
      state.message = action.payload;
    }),
    hideNofi: create.reducer((state) => {
      state.message = null;
    }),
  }),
  selectors: {
    selectMsg: state => state.message,
  }
})

export const {
  showNoti,
  hideNofi,
} = notiSlice.actions;

export const {
  selectMsg
} = notiSlice.selectors;
