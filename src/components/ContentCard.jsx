import React from 'react';
import './ContentCard.css';

const ContentCard = ({ item }) => {
  return (
    <div className="content-card">
      <img src={item.imagePath} alt={item.title} className="content-image" />
      <div className="content-info">
        <p>{item.creator}</p>
        <h3>{item.title}</h3>
        {item.viewOnly ? (
          <span>View Only</span>
        ) : item.price === 0 ? (
          <span>FREE</span>
        ) : (
          <span>${item.price.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
};

export default ContentCard;