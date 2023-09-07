import React from "react";

interface SortingProps {
  sorting: string;
  onSortingChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sorting = (props: SortingProps) => {
  return (
    <div className="sorting">
      <label htmlFor="sorting-select">Сортировка</label>
      <select
        id="sorting-select"
        className="sorting-select"
        value={props.sorting}
        onChange={props.onSortingChange}
      >
        <option value="relevance">По релевантности</option>
        <option value="newest">Самые новые</option>
      </select>
    </div>
  );
};

export default Sorting;