import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";

const Reviews = ({ gigId }) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [`reviews`],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "something went wrong "
        : data.map((review) => <Review key={review.id} review={review} />)}
      <Review />
    </div>
  );
};

export default Reviews;
