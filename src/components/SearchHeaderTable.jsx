import React from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

const SearchHeader = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
  max-width: 650px;
  left: -16px;
  position: relative;
  select {
    border-radius: 4px 0 0 4px;
  }
  input {
    border-radius: 0;
    margin: 0;
    min-width: 400px;
  }
  .btn {
    border-radius: 0 4px 4px 0;
  }
`;

export default ({
  search,
  setSearch,
  selectOptions,
  searchFunc,
  style,
  placeholder,
  hideInput,
}) => {
  return (
    <SearchHeader style={style}>
      <select
        className="form-control"
        value={search?.option}
        onChange={e => setSearch({ ...search, option: e.target.value })}
      >
        {selectOptions.map((option, key) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {!hideInput && (
        <input
          placeholder={
            placeholder || 'Selecione por qual coluna deseja filtrar'
          }
          className="form-control"
          value={search?.searchValue}
          onChange={e =>
            setSearch({
              ...search,
              searchValue: e.target.value,
            })
          }
        />
      )}
      <button type="button" className="btn btn-primary" onClick={searchFunc}>
        <FiSearch size={24} />
      </button>
    </SearchHeader>
  );
};
