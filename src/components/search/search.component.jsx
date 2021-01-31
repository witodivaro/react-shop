import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import useDebouncer from '../../hooks/useDebouncer';
import { setShopFilter } from '../../redux/shop/shop.actions';

import './search.styles.scss';

const Search = ({ placeholder, dispatch }) => {
  const {
    term: filter,
    setTerm: setFilter,
    debouncedTerm: debouncedFilter,
  } = useDebouncer('');

  useEffect(() => {
    dispatch(setShopFilter(debouncedFilter));
  }, [debouncedFilter]);

  const handleInputChange = (e) => {
    setFilter(e.target.value);
  };

  const renderedIcon = useMemo(
    () =>
      debouncedFilter ? (
        <button
          className="clear-input input-icon"
          onClick={() => setFilter('')}
        >
          ⛌
        </button>
      ) : (
        <span className="input-icon">🔎</span>
      ),
    [debouncedFilter]
  );

  return (
    <div className="search">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <label className="search-label">
          <input
            className="search-input"
            placeholder={placeholder}
            onChange={handleInputChange}
            value={filter}
          />
          {renderedIcon}
        </label>
      </form>
    </div>
  );
};

export default connect()(Search);
