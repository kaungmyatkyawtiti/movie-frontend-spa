'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import MovieCard from "./MovieCard";
import { useDeleteMovieByIdMutation } from "@/lib/features/movie/moviesApiSlice";
import { log, logError } from "@/utils/logger";
import { useDispatch } from "react-redux";
import { showNoti } from "@/lib/features/noti/notiSlice";
import { Movie } from "@/types/movies";

interface MovieCardActionProps {
  movie: Movie;
}

export default function MovieCardAction({ movie }: MovieCardActionProps) {
  const dispatch = useDispatch();

  const [deleteMovie, deleteMovieResult] = useDeleteMovieByIdMutation();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  // For ConfirmationDialog
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await deleteMovie(movie._id).unwrap();
      log("successfully deleted", result);
      dispatch(showNoti("Movie deleted successfully!"));
    } catch (error) {
      log("delete error", error);
      dispatch(showNoti("Failed to delete movie."));
    } finally {
      handleClose();
    }
  };

  const handleDeleteDecline = () => {
    log("decline");
    handleClose();
  }

  // For MovieCard
  const handleDelete = () => {
    setOpen(true);
  };

  const handleDetailClick = () => {
    log("click");
    router.push(`/movies/${movie._id}`);
  }

  return (
    <>
      <ConfirmationDialog
        open={open}
        keepMounted={true}
        title={movie.title}
        message={"are you sure to delete?"}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteDecline}
      />
      <MovieCard
        movie={movie}
        // onShowConfirmDialog={handleShowConfirmDialog}
        onDetailClick={handleDetailClick}
        onDelete={handleDelete}
      />
    </>
  )
}
