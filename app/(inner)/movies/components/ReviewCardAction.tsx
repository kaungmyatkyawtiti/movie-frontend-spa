'use client';

import { useState } from "react";
import ConfirmationDialog from "../../../../components/ConfirmationDialog";
import ReviewCard from "./ReviewCard";
import ReviewFormDialog from "./ReviewFormDialog";
import { useDeleteReviewByIdMutation } from "@/lib/features/review/reviewsApiSlice";
import { useDispatch } from "react-redux";
import { log, logError } from "@/utils/logger";
import { showNoti } from "@/lib/features/noti/notiSlice";
import { Review } from "@/types/reviews";

interface ReviewCardActionProps {
  review: Review;
}

export default function ReviewCardAction({
  review,
}: ReviewCardActionProps) {
  const dispatch = useDispatch();

  const [deleteReview] = useDeleteReviewByIdMutation();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // edit dialog 
  const handleEdit = () => {
    log("edit");
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  // delete dialog 
  const handleDelete = () => {
    log("delete");
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const result = await deleteReview(review).unwrap();
      log("successfully deleted", result);
      dispatch(showNoti("Review deleted successfully!"));
    } catch (error) {
      log("delete error", error);
      dispatch(showNoti("Failed to delete review."));
    } finally {
      handleDeleteClose();
    }
  };

  return (
    <>
      <ReviewFormDialog
        open={editOpen}
        onClose={handleEditClose}
        movieId={review.movie}
        reviewToEdit={review}
      />

      <ConfirmationDialog
        open={deleteOpen}
        keepMounted
        title="Delete this comment"
        message="Are you sure you want to delete this review?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteClose}
      />

      <ReviewCard
        review={review}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </>
  );
}
