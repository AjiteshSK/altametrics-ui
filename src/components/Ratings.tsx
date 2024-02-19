import React, { useState } from "react";

interface RatingsProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}

const Ratings: React.FC<RatingsProps> = ({
  initialRating = 0,
  onRatingChange,
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoverRating, setHoverRating] = useState<number>(0); // New state for hover index

  const handleSetRating = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          onMouseEnter={() => setHoverRating(index + 1)} // Set hover rating on mouse enter
          onMouseLeave={() => setHoverRating(0)} // Reset hover rating on mouse leave
          onClick={() => handleSetRating(index)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={index < (hoverRating || rating) ? "orange" : "gray"} // Use hoverRating if non-zero, else use rating
          className="w-6 h-6 cursor-pointer transition-colors duration-200" // Add transition for smooth color change
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

export default Ratings;
