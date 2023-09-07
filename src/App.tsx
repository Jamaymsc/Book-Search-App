import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import BookList from "./components/BookList/BookList";
import { Book } from "./models/IBook";
import { searchBooks } from "./store/api";
import { Loader } from "./components/Loader/Loader";
import BookDetailPage from "./components/BookDetail/BookDetailPage";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [sorting, setSorting] = useState<string>("relevance");
  const [loading, setLoading] = useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const booksPerPage = 30;
  const [booksInfo, setBooksInfo] = useState<{
    books: Book[];
    currentPage: number;
    totalItems: number;
  }>({
    books: [],
    currentPage: 1,
    totalItems: 0,
  });

  useEffect(() => {
    setBooks([]);
    setTotalItems(0);
    setCurrentPage(1);
  }, [query, category, sorting]);

  const performSearch = async (page: number, booksPerPage: number) => {
    try {
      setLoading(true);
      const { books, totalItems } = await searchBooks(
        query,
        category,
        sorting,
        currentPage,
        booksPerPage
      );

      if (page === 1) {
        setTotalItems(totalItems);
        setBooks(books);
        setBooksInfo({
          books,
          currentPage: page,
          totalItems,
        });
      } else {
        setBooks((prevBooks) => [...prevBooks, ...books]);
        setBooksInfo((prevInfo) => ({
          books: [...prevInfo.books, ...books],
          currentPage: page,
          totalItems,
        }));
      }

      setBooksInfo({
        books: [...booksInfo.books, ...books],
        currentPage: page,
        totalItems: totalItems,
      });
      return { success: true };
    } catch (error) {
      alert("Ошибка в поиске книги");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentPage > 1) {
      performSearch(currentPage, booksPerPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, booksPerPage]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      setQuery(event.target.value);
    }
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  const handleSortingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSorting(event.target.value);
  };

  const loadMoreBooks = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    performSearch(nextPage, booksPerPage);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header
            query={query}
            category={category}
            sorting={sorting}
            onQueryChange={handleQueryChange}
            onCategoryChange={handleCategoryChange}
            onSortingChange={handleSortingChange}
            onSearch={() => performSearch(1, 30)}
          />
          <main className="main-content">
            <Routes>
              <Route
                path="/book/:bookId"
                element={<BookDetailPage books={books} />}
              />
              <Route
                path="/"
                element={
                  <>
                    {totalItems > 0 && (
                      <div className="books-found">
                        Книг найдено {totalItems}
                      </div>
                    )}
                    <BookList books={books} onLoad={loadMoreBooks} />
                    {loading && <Loader />}
                  </>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
