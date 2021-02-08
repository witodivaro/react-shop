import { useQuery } from "@apollo/client";
import React, { useEffect, useMemo } from "react";

import { setShopFilter } from "../../graphql/shop/shop.mutations";
import { GET_SHOP_FILTER } from "../../graphql/shop/shop.queries";
import useDebouncer from "../../hooks/useDebouncer";

import FormInput from "../form-input/form-input.component";

import "./search.styles.scss";

const Search = () => {
  const {
    data: { shopFilter },
  } = useQuery(GET_SHOP_FILTER);

  const {
    term: filter,
    setTerm: setFilter,
    debouncedTerm: debouncedFilter,
  } = useDebouncer(shopFilter);

  useEffect(() => {
    setShopFilter(debouncedFilter);
  }, [debouncedFilter]);

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
          x
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

export default Search;
