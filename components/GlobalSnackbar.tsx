"use client";

import { hideNofi, selectMsg } from "@/lib/features/noti/notiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Snackbar } from "@mui/material";

export default function GlobalSnackbar() {
  const dispatch = useAppDispatch();
  const message = useAppSelector(selectMsg);

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom"
      }}
      open={!!message}
      autoHideDuration={3000}
      onClose={() => dispatch(hideNofi())}
      message={message}
      sx={{
        maxWidth: { xs: '65%' }
      }}
    />
  )
}
