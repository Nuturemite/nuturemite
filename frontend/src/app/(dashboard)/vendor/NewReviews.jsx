import React from "react";
import { MoreHorizontal } from "lucide-react";
import { useTodayReviews } from "@/lib/data";
import Loader from "@/components/shared/loader";
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      stars.push(<span key={i}>&#9733;</span>); 
    } else if (i < rating) {
      stars.push(<span key={i}>&#189;</span>); 
    } else {
      stars.push(<span key={i}>&#9734;</span>);
    }
  }
  return <div className="text-yellow-500">{stars}</div>;
};

const ReviewCard = ({ review }) => {
  return (
    <div className="flex items-start space-x-4 py-4 border-b last:border-none">
      <img
        src={`https://robohash.org/${review.author._id}`}
        alt={review.author.name}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold">{review.author.name}</h3>
          <StarRating rating={review.rating} />
        </div>
        <p className="text-sm text-gray-600">{review.comment}</p>
      </div>
    </div>
  );
};
const NewReviews = () => {
  const { todayReviews, isLoading, error } = useTodayReviews();
  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">New Reviews</h2>
        <MoreHorizontal className="cursor-pointer" />
      </div>
      {todayReviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
};

export default NewReviews;
