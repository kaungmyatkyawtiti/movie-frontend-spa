import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from "react-hook-form";
import { useSaveMovieMutation, useUpdateMovieByIdMutation } from "@/lib/features/movie/moviesApiSlice";
import { useEffect, useMemo } from "react";
import z from 'zod';
import { useDispatch } from "react-redux";
import { log, logError } from "@/utils/logger";
import { movieSchema } from "@/data/schemas";
import { showNoti } from "@/lib/features/noti/notiSlice";
import { Movie } from "@/types/movies";

interface MovieFormDialogProps {
  open: boolean;
  onClose: () => void;
  movieToEdit?: Movie;
}

type MovieFormData = z.infer<typeof movieSchema>;

export default function MovieFormDialog({
  open,
  onClose,
  movieToEdit,
}: MovieFormDialogProps) {
  const dispatch = useDispatch();

  const [saveMovie, saveMovieResult] = useSaveMovieMutation();

  const [updateMovie, updateMovieResult] = useUpdateMovieByIdMutation();

  const defaultValues = useMemo(() => ({
    title: "",
    director: {
      name: "",
      phoneNo: ""
    },
    year: undefined,
  }), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues
  })

  useEffect(() => {
    reset(movieToEdit ?? defaultValues);
  }, [movieToEdit, defaultValues, reset]);

  const isSubmitting = saveMovieResult.isLoading || updateMovieResult.isLoading;

  const onSubmit: SubmitHandler<MovieFormData> = async (data) => {
    if (movieToEdit) {
      const updated: Movie = {
        _id: movieToEdit._id,
        title: data.title,
        year: data.year,
        director: {
          _id: movieToEdit.director._id,
          name: data.director.name,
          phoneNo: data.director.phoneNo,
        },
      };
      try {
        const data = await updateMovie(updated).unwrap();
        log("update movie success from movie dialog", data);
        dispatch(showNoti("Successfully update movie"));
      } catch (err) {
        log("update movie error from movie dialog", err);
        dispatch(showNoti("Failed to update movie"));
      } finally {
        reset();
        onClose();
      }
    } else {
      const newMovie = data;
      try {
        const data = await saveMovie(newMovie).unwrap();
        log("save movie success from movie dialog", data);
        dispatch(showNoti("Successfully save movie"));
      } catch (err) {
        log("save movie error from movie dialog", err);
        dispatch(showNoti("Failed to save movie"));
      } finally {
        reset();
        onClose();
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            maxHeight: '100vh',
            width: '100%',
            maxWidth: 500,
          },
        },
      }}
    >
      <DialogTitle
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {
          movieToEdit
            ? "Edit Movie"
            : "New Movie"
        }
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {
            movieToEdit
              ? "Update the movie's information."
              : "Add a new movie by entering its title, director, and release year."
          }
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Grid size={12}>
              <TextField
                type="text"
                margin="dense"
                fullWidth
                variant="filled"
                label="Title"
                {...register("title")}
                helperText={errors.title?.message}
                error={!!errors.title}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="text"
                margin="dense"
                fullWidth
                variant="filled"
                label="Director name"
                {...register("director.name")}
                helperText={errors.director?.name?.message}
                error={!!errors.director?.name}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                type="text"
                margin="dense"
                fullWidth
                variant="filled"
                label="Director phoneNo"
                {...register("director.phoneNo")}
                helperText={errors.director?.phoneNo?.message}
                error={!!errors.director?.phoneNo}
                disabled={isSubmitting}
              />
            </Grid>

            <Grid size={12}>
              <TextField
                type="number"
                margin="dense"
                fullWidth
                variant="filled"
                label="Year"
                {...register("year")}
                helperText={errors.year?.message}
                error={!!errors.year}
                disabled={isSubmitting}
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button
              onClick={onClose}
              sx={{
                color: "red"
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              {
                isSubmitting
                  ? (
                    <>
                      <CircularProgress size={20} />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )
              }
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}
