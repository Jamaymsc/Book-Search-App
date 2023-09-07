import React from "react";
import { useNavigate } from "react-router-dom";
import "./BookDetail.css";

interface BookDetailProps {
  cover: string;
  category: string;
  title: string;
  author: string | string[];
  description: string;
}
export const BookDetail = ({
  cover,
  category,
  title,
  author,
  description,
}: BookDetailProps) => {

  const navigate = useNavigate();
    const handlePicClick = () => {
      navigate(`/`);
    };

  return (
    <div className="book-container">
      <div className="book-cover-container">
        <img src={cover} alt={title} className="book-cover" onClick={handlePicClick} />
      </div>
      <div className="book-info">
        <div className="book-category">{category}</div>
        <div className="book-title">{title}</div>
        <div className="book-author">{author}</div>
        <div className="book-description">{description}</div>
      </div>
    </div>
  );
};
