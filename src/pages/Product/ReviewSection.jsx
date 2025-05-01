import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getecomData } from "../../Services/ecomapiServices";
import { getloginData } from "../../Services/loginApiServices";
import "./product.scss";

const ReviewSection = ({ productId }) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await getecomData(`/reviews/product/${productId}`);

      if (response.status) {
        const fetchedReviews = response.data;
        const reviewsWithUser = await Promise.all(
          fetchedReviews.map(async (review) => {
            try {
              const userResponse = await getloginData(`/users/${review.userId}`);
              console.log({userResponse})
              if (userResponse.status===200) {
                const userData = userResponse.data;
                return {
                  ...review,
                  userName: userData.name,
                  userLocation: userData.location || "",
                  helpful: review.helpful || 0,
                  images: review.images || [],
                };
              } else {
                return {
                  ...review,
                  userName: "Anonymous",
                  userLocation: "",
                  helpful: review.helpful || 0,
                  images: review.images || [],
                };
              }
            } catch (error) {
              console.error("Error fetching user data for review", review.userId, error);
              return {
                ...review,
                userName: "Anonymous",
                userLocation: "",
                helpful: review.helpful || 0,
                images: review.images || [],
              };
            }
          })
        );
        setReviews(reviewsWithUser);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
    : 0;
  const ratingCounts = [5, 4, 3, 2, 1].reduce((acc, star) => {
    acc[star] = reviews.filter((review) => review.rating === star).length;
    return acc;
  }, {});

  const getBarColor = (star) => {
    return `star-${star}`;
  };

  return (
    <div className="review-section">
      {/* Overall Ratings */}
      <div className="overall-ratings">
        <div className="header-row">
          <h2>Ratings & Reviews</h2>
          <button
            onClick={() => navigate("/rate-product")}
            className="rate-button"
          >
            Rate Product
          </button>
        </div>
        <div className="ratings-container">
          {/* Average Rating */}
          <div className="average-rating">
            <h3>{averageRating}</h3>
            <p>
              {totalReviews} Ratings & {totalReviews} Reviews
            </p>
          </div>
          {/* Star Breakdown */}
          <div className="star-breakdown">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="star-row">
                <span className="star-label">{star}★</span>
                <div className="progress-bar-container">
                  <div
                    className={`progress-bar ${getBarColor(star)}`}
                    style={{
                      width: `${totalReviews ? (ratingCounts[star] / totalReviews) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
                <span className="star-count">{ratingCounts[star]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Reviews */}
      <div className="user-reviews">
        <h3>User Reviews</h3>
        <div className="reviews-grid">
          {reviews.map((review, index) => {
            const reviewDate = new Date(review.createdAt).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });
            return (
              <div
                key={index}
                className="review-card"
              >
                <div className="review-header">
                  {/* Rating Stars */}
                  <span className="stars">
                    {Array(review.rating)
                      .fill(0)
                      .map((_, i) => (
                        <AiFillStar key={i} />
                      ))}
                  </span>
                  <span className="review-date">{reviewDate}</span>
                </div>
                <h4 className="reviewer-name">{review.userName}</h4>
                <p className="review-text">{review.reviewText}</p>
                <p className="reviewer-info">
                  By <span className="name">{review.userName}</span>{" "}
                  {review.userLocation && `from ${review.userLocation}`}
                </p>
                {/* Uploaded Images */}
                {review.images && review.images.length > 0 && (
                  <div className="review-images">
                    {review.images.map((image, i) => (
                      <img
                        key={i}
                        src={image}
                        alt={`Review ${index + 1} Image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
                <div className="review-actions">
                  <button className="helpful">
                    <FaThumbsUp /> Helpful ({review.helpful})
                  </button>
                  <button className="not-helpful">
                    <FaThumbsDown />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;