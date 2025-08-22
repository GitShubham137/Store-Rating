import React, { useState } from 'react';
import userService from '../services/userService';

const RatingForm = ({ storeId, userRating, onRatingSubmitted }) => {
  const [rating, setRating] = useState(userRating ? userRating.rating : '');
  const ratingId = userRating ? userRating._id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (ratingId) {
        await userService.modifyRating(ratingId, rating);
      } else {
        await userService.submitRating(storeId, rating);
      }
      onRatingSubmitted();
    } catch (error) {
      console.error('Failed to submit rating', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
        className="w-20 px-2 py-1 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        {ratingId ? 'Update' : 'Submit'}
      </button>
    </form>
  );
};

export default RatingForm;
