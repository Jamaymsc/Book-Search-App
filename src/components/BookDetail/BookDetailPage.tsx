import React from "react";
import { useParams} from "react-router-dom";
import { Book } from "../../models/IBook";
import { BookDetail } from "./BookDetail";

interface BookDetailPageProps {
  books: Book[];
}

 const BookDetailPage = ({ books }: BookDetailPageProps) => {
  
  const { bookId } = useParams<{ bookId: string }>();
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return <div>Книга не найдена</div>;
  }

   return (
    <div>
      <BookDetail
        cover={book.image}
        title={book.title}
        author={book.authors}
        category={book.category}
        description={book.description}
      />
    </div>
  );
};

export default BookDetailPage;