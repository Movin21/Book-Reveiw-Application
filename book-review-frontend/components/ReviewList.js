import { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../constants/api";

function StarDisplay({ rating }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-6 h-6 ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.54 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewList({ setEditingReview }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(ENDPOINTS.GET_REVIEWS);
      setReviews(response.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(ENDPOINTS.DELETE_REVIEW(id));
        setReviews(reviews.filter((review) => review._id !== id));
      } catch (error) {
        console.error("Failed to delete review:", error);
      }
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Book Reviews</h1>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="mb-4 border p-4 rounded-lg">
            <h2 className="text-2xl">{review.bookTitle}</h2>
            <p className="text-gray-700">By {review.author}</p>
            <StarDisplay rating={review.rating} />
            <p className="mt-2">{review.reviewText}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.dateAdded).toLocaleDateString()}
            </p>
            <div className="mt-4">
              <button
                onClick={() => handleEdit(review)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(review._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
}
