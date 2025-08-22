import React from 'react';
import RatingForm from './RatingForm';

const StoreCard = ({ store, onRatingSubmitted }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold">{store.name}</h3>
      <p className="text-gray-600">{store.address}</p>
      <div className="flex items-center justify-between mt-4">
        <div>
          <span className="font-semibold">Overall Rating:</span> {store.rating.toFixed(1)}
        </div>
        <div>
          <span className="font-semibold">Your Rating:</span>{' '}
          {store.userSubmittedRating || 'Not rated'}
        </div>
      </div>
      <div className="mt-4">
        <RatingForm
          storeId={store._id}
          userRating={store.userSubmittedRating}
          onRatingSubmitted={onRatingSubmitted}
        />
      </div>
    </div>
  );
};

export default StoreCard;
