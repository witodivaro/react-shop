import { useQuery } from "@apollo/client";
import React, { useMemo } from "react";

import CollectionItem from "../../components/collection-item/collection-item.component";
import Search from "../../components/search/search.component";
import Spinner from "../../components/spinner/spinner.component";
import {
  GET_SHOP_DATA,
  GET_SHOP_FILTER,
} from "../../graphql/shop/shop.queries";
import { getItemsByFilter } from "../../graphql/shop/shop.utils";

import { SearchResultContainer } from "./search-result.styles";

const SearchResultPage = () => {
  const { loading, data } = useQuery(GET_SHOP_DATA);

  const {
    data: { shopFilter },
  } = useQuery(GET_SHOP_FILTER);

  const collections = data?.collections || [];

  const collectionItems = getItemsByFilter(collections, shopFilter);

  const renderedItems = useMemo(
    () =>
      collectionItems
        ? collectionItems.map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))
        : null,
    [collectionItems]
  );

  if (loading) return <Spinner />;

  return (
    <SearchResultContainer>
      <Search />
      {renderedItems}
    </SearchResultContainer>
  );
};

export default SearchResultPage;
