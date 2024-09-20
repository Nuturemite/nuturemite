import ReviewForm from "@/components/forms/ReviewForm";
import Error from "@/components/shared/error";
import Loader from "@/components/shared/loader";
import { Button } from "@/components/ui";
import {
  Dialog,
  DialogPortal,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useReviews } from "@/lib/data";
import { useAuthContext } from "@/context/authprovider";
const ReviewComponent = ({ product }) => {
  const { reviews, isLoading, error } = useReviews(product._id);
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <div>Please login to add a review</div>;
  }
  if (!product.hasUserBought) {
    return <div>You need to buy the product to add a review</div>;
  }
  if (error) return <Error />;
  if (isLoading) return <Loader />;

  return (
    <div className="py-4 ">
      <div className="flex items-center gap-10">
        <h2 className="text-2xl font-medium ">Customer Reviews</h2>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Review</Button>
            </DialogTrigger>
            <DialogPortal>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Review</DialogTitle>
                  <DialogDescription>Add a review.</DialogDescription>
                </DialogHeader>
                <ReviewForm productId={product._id} />
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
      </div>
      {reviews.map((review, index) => (
        <div key={index} className="mt-4 border-b pb-4">
          <div className="flex items-center">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.56-.955L10 0l2.952 5.955 6.56.955-4.756 4.635 1.122 6.545z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h3 className="mt-2 font-medium">{review.title}</h3>
          <p className="mt-1">{review.content}</p>
          <div className="mt-2 text-sm text-gray-500">by {review.author.name}</div>
        </div>
      ))}
    </div>
  );
};
export default ReviewComponent;
