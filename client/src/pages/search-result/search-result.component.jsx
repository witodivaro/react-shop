import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import { selectItemsByFilter } from "../../redux/shop/shop.selectors";

import { SearchResultContainer } from "./search-result.styles";

const SearchResultPage = () => {
  const collectionItems = useSelector(selectItemsByFilter);

  const renderedItems = useMemo(
    () =>
      collectionItems.map((item) => (
        <CollectionItem key={item.id} item={item} />
      )),
    [collectionItems]
  );

  return <SearchResultContainer>{renderedItems}</SearchResultContainer>;
};

export default SearchResultPage;
