import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import useDebouncer from "../../hooks/useDebouncer";

import { setShopFilter } from "../../redux/shop/shop.actions";
import { selectShopFilter } from "../../redux/shop/shop.selectors";

import FormInput from "../form-input/form-input.component";

import "./search.styles.scss";

const Search = ({ currentFilter, dispatch }) => {
  const {
    term: filter,
    setTerm: setFilter,
    debouncedTerm: debouncedFilter,
  } = useDebouncer(currentFilter);

  useEffect(() => {
    dispatch(setShopFilter(debouncedFilter));
  }, [debouncedFilter, dispatch]);

  const handleInputChange = (e) => {
    setFilter(e.target.value);
  };

  const renderedIcon = useMemo(
    () =>
      debouncedFilter ? (
        <button
          className="clear-input input-icon"
          onClick={() => setFilter("")}
        >
          ⛌
        </button>
      ) : (
        <span className="input-icon">🔎</span>
      ),
    [debouncedFilter, setFilter]
  );

  return (
    <div className="search">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <label className="search-label">
          <FormInput
            placeholder="Search shop items"
            onChange={handleInputChange}
            value={filter}
          />
          {renderedIcon}
        </label>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentFilter: selectShopFilter,
});

export default connect(mapStateToProps)(Search);
