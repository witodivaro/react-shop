import React, { useMemo } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";

import {
  ItemsContainer,
  CollectionPreviewContainer,
  TitleContainer,
} from "./collection-preview.styles";

const ITEMS_AMOUNT_ON_PREVIEW = 4;

const CollectionPreview = ({ title, items }) => {
  const history = useHistory();
  const match = useRouteMatch();

  const renderedItems = useMemo(() => {
    return items.slice(0, ITEMS_AMOUNT_ON_PREVIEW).map((item) => {
      return <CollectionItem key={item.id} item={item} />;
    });
  }, [items]);

  return (
    <CollectionPreviewContainer>
      <TitleContainer
        onClick={() => history.push(`${match.path}/${title.toLowerCase()}`)}
      >
        {title.toUpperCase()}
      </TitleContainer>
      <ItemsContainer>{renderedItems}</ItemsContainer>
    </CollectionPreviewContainer>
  );
};

export default CollectionPreview;
