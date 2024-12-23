import axios from "axios";
import { ENDPOINTS } from "../constants/api";
import { useState, useEffect } from "react";
import StarRating from "./StarRating";

export default function ReviewForm({
  refreshReviews,
  editingReview,
  setEditingReview,
}) {
  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    rating: 1,
    reviewText: "",
  });

  useEffect(() => {
    if (editingReview) {
      setFormData({
        bookTitle: editingReview.bookTitle,
        author: editingReview.author,
        rating: editingReview.rating,
        reviewText: editingReview.reviewText,
      });
    }
  }, [editingReview]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingReview) {
        await axios.put(ENDPOINTS.UPDATE_REVIEW(editingReview._id), formData);
      } else {
        await axios.post(ENDPOINTS.POST_REVIEW, formData);
      }
      refreshReviews();
      setFormData({ bookTitle: "", author: "", rating: 1, reviewText: "" });
      setEditingReview(null);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <form className="p-6 border rounded-lg mb-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4">
        {editingReview ? "Edit Review" : "Add a Book Review"}
      </h2>
      <div className="mb-4">
        <label>Book Title</label>
        <input
          type="text"
          name="bookTitle"
          value={formData.bookTitle}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label>Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label>Rating</label>
        <StarRating
          rating={formData.rating}
          setRating={(rating) => setFormData({ ...formData, rating })}
        />
      </div>
      <div className="mb-4">
        <label>Review</label>
        <textarea
          name="reviewText"
          value={formData.reviewText}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {editingReview ? "Update Review" : "Submit Review"}
      </button>
    </form>
  );
}
