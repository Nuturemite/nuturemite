"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { tst } from "@/lib/utils";

const initialReviewData = {
  title: "",
  comment: "",
  rating: "",
  product: "",
};

function ReviewForm({ productId }) {
  const [reviewData, setReviewData] = useState({
    ...initialReviewData,
    product: productId,
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    try {
      await api.post("/reviews", reviewData);
      tst.success("Review submitted successfully");
      setReviewData(initialReviewData);
    } catch (err) {
      tst.error(err || "Failed to submit review");
      setError(err);
    } finally {
      setPending(false);
    }
  };

  return (
    <form className="w-full " onSubmit={handleSubmit}>
      <div className="grid gap-6 py-4">
        <div>
          <Label htmlFor="title" className="mb-2 block">
            Title
          </Label>
          <Input
            type="text"
            name="title"
            value={reviewData.title}
            onChange={handleChange}
            id="title"
            disabled={pending}
            placeholder="Review Title"
            required
            minLength="3"
          />
        </div>

        <div>
          <Label htmlFor="comment" className="mb-2 block">
            Comment
          </Label>
          <Textarea
            name="comment"
            value={reviewData.comment}
            onChange={handleChange}
            disabled={pending}
            id="comment"
            placeholder="Write your review..."
            required
            minLength="10"
            className="min-h-[6rem]"
          />
        </div>

        <div>
          <Label htmlFor="rating" className="mb-2 block">
            Rating
          </Label>
          <Input
            type="number"
            name="rating"
            value={reviewData.rating}
            onChange={handleChange}
            id="rating"
            disabled={pending}
            placeholder="Rating (1-5)"
            required
            min={1}
            max={5}
          />
        </div>

        <Button type="submit" className="mt-4" pending={pending}>
          Submit Review
        </Button>
        {error && (
          <p className="text-red-500 mt-4">
            {error.response.data.message ?? error.message}
          </p>
        )}
      </div>
    </form>
  );
}

export default ReviewForm;
