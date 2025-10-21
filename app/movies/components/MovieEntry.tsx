'use client';

import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";

import {
  Add as AddIcon
} from "@mui/icons-material";

import { useState } from "react"
import MovieFormDialog from "./MovieFormDialog";


export default function MovieEntry() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: { xs: 0, md: 4 },
        py: { xs: 2, md: 4 },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 500
        }}
      >
        📽️ ReelBox
      </Typography>
      {
        isSmallScreen
          ? (
            // Round icon button for small screens
            <IconButton
              onClick={handleClickOpen}
              size="medium"
              sx={{
                bgcolor: 'success.main',
                '&:hover': {
                  bgcolor: 'success.dark',
                },
                color: 'white',
              }}
            >
              <AddIcon />
            </IconButton>
          )
          : (
            // Full button for larger screens
            <Button
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
              sx={{
                bgcolor: 'success.main',
                '&:hover': {
                  bgcolor: 'success.dark',
                },
                color: 'white',
              }}
            >
              New Movie
            </Button>
          )
      }
      <MovieFormDialog
        open={open}
        onClose={handleClose}
      />
    </Box>
  )
}
