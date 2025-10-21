'use client';

import { Box, Button } from "@mui/material";
import ConfirmationDialog from "../movies/components/ConfirmationDialog";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/features/auth/authSlice";
import { redirect } from "next/navigation";
import { log, logError } from "../utils/logger";
import IsAuth from "../components/IsAuth";
import { showSnackbar } from "@/lib/features/snackbar/snackbarSlice";

function LogoutPage() {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const showConfirmDialog = () => {
    setOpen(true);
  }

  // For ConfirmationDialog
  const handleClose = () => {
    setOpen(false);
  };

  const handleDecline = () => {
    log("decline");
    handleClose();
  }

  const handleConfirm = () => {
    dispatch(logout());
    log("success logout");
    dispatch(showSnackbar("Successfully logout."));
    redirect("/login");
    handleClose();

    // dispatch(logout());
    // handleClose();
    // redirect("/login");
  };

  return (
    <Box sx={{ m: 4 }}>
      <ConfirmationDialog
        open={open}
        keepMounted={true}
        title={"Logout this account"}
        message={"are you sure to Logout?"}
        onConfirm={handleConfirm}
        onCancel={handleDecline}
      />
      <Button
        variant="contained"
        onClick={showConfirmDialog}>
        Logout
      </Button>
    </Box>
  )
}

export default IsAuth(LogoutPage);
