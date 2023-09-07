import React from "react";
import "./LoadMoreButton.css"

interface LoadMoreButtonProps {
  onLoad: () => void;
}

export const LoadMoreButton = (props: LoadMoreButtonProps) => {
  const handleLoading = () => {
    props.onLoad();
  };
  return (
    <div className="button-container">
    <button className="load-more-button" onClick={handleLoading}>
      Загрузить еще
    </button>
    </div>
  );
};
