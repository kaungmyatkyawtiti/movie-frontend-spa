'use client';

import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/features/auth/authSlice";
import { redirect, useRouter } from "next/navigation";
import { log } from "@/utils/logger";
import ConfirmationDialog from "@/components/ConfirmDialog";
import IsAuth from "@/components/IsAuth";
import { showNoti } from "@/lib/features/noti/notiSlice";

function LogoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
    try {
      dispatch(logout());
      dispatch(showNoti("Successfully logout."));
      router.push("/login");
    } catch (err) {
      log("logout error", err);
      dispatch(showNoti("Failed to logout."));
    } finally {
      handleClose();
    }
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
