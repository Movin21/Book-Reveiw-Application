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
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterRating, setFilterRating] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    let sortedReviews = [...reviews];

    // Sort by date
    sortedReviews.sort((a, b) => {
      return sortOrder === "newest"
        ? new Date(b.dateAdded) - new Date(a.dateAdded)
        : new Date(a.dateAdded) - new Date(b.dateAdded);
    });

    // Filter by rating
    if (filterRating) {
      sortedReviews = sortedReviews.filter(
        (review) => review.rating === parseInt(filterRating)
      );
    }

    setFilteredReviews(sortedReviews);
  }, [reviews, sortOrder, filterRating]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(ENDPOINTS.GET_REVIEWS);
      setReviews(response.data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Book Reviews</h1>

      {/* Sorting and Filtering */}
      <div className="flex justify-between mb-6">
        {/* Sort by Date */}
        <div>
          <label className="mr-2 text-lg">Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Filter by Rating */}
        <div>
          <label className="mr-2 text-lg">Filter by Rating:</label>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="bg-white text-blue-500 px-4 py-2 border rounded cursor-pointer"
          >
            <option value="">All</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Display Reviews */}
      {filteredReviews.length > 0 ? (
        filteredReviews.map((review) => (
          <div key={review._id} className="mb-4 border p-4 rounded-lg">
            <h2 className="text-2xl">{review.bookTitle}</h2>
            <p className="text-gray-700">By {review.author}</p>
            <StarDisplay rating={review.rating} />
            <p className="mt-2">{review.reviewText}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.dateAdded).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
}
