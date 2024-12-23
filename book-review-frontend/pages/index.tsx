import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";
import { useState } from "react";

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const refreshReviews = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <ReviewForm
        refreshReviews={refreshReviews}
        editingReview={editingReview}
        setEditingReview={setEditingReview}
      />
      <ReviewList key={refresh.toString()} setEditingReview={setEditingReview} />
    </div>
  );
}
