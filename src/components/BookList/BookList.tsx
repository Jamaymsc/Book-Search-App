import React from "react";
import { Book } from "../../models/IBook";
import BookCard from "../BookCard/BookCard";
import { LoadMoreButton } from "../LoadMoreButton/LoadMoreButton";
import "./BookList.css";

interface BookListProps {
  books: Book[];
  onLoad: ()=> void;
}

const BookList = ({ books, onLoad }: BookListProps) => {

  const uniqueBooks = books.filter((book, index, self) => {
    const isUnique = self.findIndex((prevBook) => {
      return prevBook.category === book.category && prevBook.title === book.title;
    }) === index;
    return isUnique;
  });

  if (!books || books.length === 0) {
    return <div className="no-books-title">Воспользуйтесь поиском, чтобы найти книгу</div>;
  }

  return (
   <div className="books-page">
    
    <div className="book-list">
      {uniqueBooks.map((book, index) => (
        <BookCard key={book.id + index} book={book} />
      ))}
    </div>
    {books && (
          <LoadMoreButton onLoad={onLoad} />
        )}
    </div>
  );
};

export default BookList;
