import React from "react";
import { Book } from "../../models/IBook";
import "./BookCard.css";

import { useNavigate } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/book/${book.id}`);
  };

  if (!book) {
    return (
      <div className="book-card">Неправильно указана информация для поиска</div>
    );
  }

  const category = book.category?.length > 0 ? book.category : "нет категории";
  const authors = book.authors?.join(",") || "нет авторов";
  const bookTitle = book.title || "нет названия";
  
  return (
    <div className="book-card">
      <img
        src={book.image}
        alt={book.title}
        className="book-cover"
        onClick={handleCardClick}
     
      />
       
      <div className="book-info">
        <div className="book-category">{category}</div>
        <div className="book-title">{bookTitle}</div>
        <div className="book-authors">{authors}</div>
      </div>
    </div>
  );
};

export default BookCard;
