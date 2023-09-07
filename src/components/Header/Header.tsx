import React from "react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import CategoryFilter from "../CategoryFilter";
import Sorting from "../Sorting";

interface HeaderProps {
  query: string;
  category: string;
  sorting: string;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSortingChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearch: () => void;
}
const Header = (props: HeaderProps) => {
  
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Search for books</h1>
        <div className="search-container">
          <div className="search-input-container">
            <SearchBar
              query={props.query}
              onQueryChange={props.onQueryChange}
              onSearch={props.onSearch}
            />
          </div>
          <div className="filter-sort-container">
            <div className="filter-container">
              <CategoryFilter
                category={props.category}
                onCategoryChange={props.onCategoryChange}
              />
            </div>
            <div className="sorting-container">
              <Sorting
                sorting={props.sorting}
                onSortingChange={props.onSortingChange}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
