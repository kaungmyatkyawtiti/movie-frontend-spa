"use client";

import { selectAuthToken } from "@/lib/features/auth/authSlice";
import { useAppSelector } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Typography } from '@mui/material';
import useAuth from "@/app/auth/useAuth";
import { log } from "@/app/utils/logger";

function AuthCheckLoading() {
  return (
    <Box
      sx={{
        height: "60vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4'>
        Checking Auth
      </Typography>
    </Box>
  )
}

export default function IsAuth<T>(
  Component: React.ComponentType<T>
) {
  return (props: T) => {
    const router = useRouter();
    const isAuth = useAuth();
    const pathname = usePathname();

    log('Path name ', pathname);

    useEffect(() => {
      log("Effect ran, token is :", isAuth, "pathname:", pathname);

      if (!isAuth) {
        router.replace(`/login?redirectUrl=${pathname}`);
        return;
      }
    }, []);

    if (!isAuth) {
      return <AuthCheckLoading />;
    }

    return (
      <>
        <Component {...props!} />
      </>
    );
  };
}
