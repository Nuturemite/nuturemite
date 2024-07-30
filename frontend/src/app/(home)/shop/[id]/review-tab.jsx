export default function ReviewForm({ product }) {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          comment,
          rating,
          product: product.id,
        }),
      });

      if (res.ok) {
        alert("Review created successfully!");
      } else {
        alert("Error creating review.");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating review.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="rating">Rating</label>
        <input
          type="range"
          min="1"
          max="5"
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <span>{rating}</span>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
