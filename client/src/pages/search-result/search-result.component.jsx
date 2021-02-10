import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import CollectionItem from "../../components/collection-item/collection-item.component";

import {
  selectItemsByFilter,
  selectShopFilter,
} from "../../redux/shop/shop.selectors";

import {
  SearchResultContainer,
  TitleContainer,
  ItemsContainer,
} from "./search-result.styles";

const SearchResultPage = () => {
  const shopFilter = useSelector(selectShopFilter);
  const collectionItems = useSelector(selectItemsByFilter);

  const renderedItems = useMemo(
    () =>
      collectionItems.map((item) => (
        <CollectionItem key={item.id} item={item} />
      )),
    [collectionItems]
  );

  const isNothingFound = !!collectionItems.length;

  const renderedTitle = useMemo(
    () =>
      isNothingFound
        ? `Search result for "${shopFilter}"`
        : "Nothing was found :(",
    [isNothingFound, shopFilter]
  );

  return (
    <SearchResultContainer>
      <TitleContainer>{renderedTitle}</TitleContainer>
      <ItemsContainer>{renderedItems}</ItemsContainer>
    </SearchResultContainer>
  );
};

export default SearchResultPage;
