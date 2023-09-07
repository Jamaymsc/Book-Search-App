import React from "react";

interface CategoryFilterProps {
  category: string;
  onCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategoryFilter = (props : CategoryFilterProps) => {
  return (
    <div className="category-filter">
      <label htmlFor="filter-select">Категория</label>
      <select
        id="filter-select"
        className="filter-select"
        value={props.category}
        onChange={props.onCategoryChange}
      >
        <option value="all">Все категории</option>
        <option value="art">Искусство</option>
        <option value="biography">Биография</option>
        <option value="computers">Компьютеры</option>
        <option value="history">История</option>
        <option value="medicine">Медицина</option>
        <option value="poetry">Поэзия</option>
      </select>
    </div>
  );
};

export default CategoryFilter;