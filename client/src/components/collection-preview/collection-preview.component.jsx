import React, { useMemo } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

import TinySlider from "tiny-slider-react";
import CollectionItem from "../collection-item/collection-item.component";

import {
  ItemContainer,
  CollectionPreviewContainer,
  TitleContainer,
} from "./collection-preview.styles";

const MOBILE_WIDTH = 800;

const ITEMS_AMOUNT_ON_PREVIEW = 4;
const SLIDER_TIMEOUT = 3500;

const sliderSettings = {
  items: ITEMS_AMOUNT_ON_PREVIEW,
  controls: false,
  nav: false,
  autoplay: true,
  autoplayButtonOutput: false,
  autoplayTimeout: SLIDER_TIMEOUT,
  autoplayHoverPause: true,
  useLocalStorage: true,
};

const CollectionPreview = ({ title, items }) => {
  const isMobile = window.screen.width < MOBILE_WIDTH;

  const history = useHistory();
  const match = useRouteMatch();

  const renderedItems = useMemo(() => {
    const slicedItems = isMobile
      ? items.slice(0, ITEMS_AMOUNT_ON_PREVIEW)
      : items;

    return slicedItems.map((item) => {
      return (
        <ItemContainer key={item.id}>
          <CollectionItem item={item} />
        </ItemContainer>
      );
    });
  }, [items, isMobile]);

  const renderSlider = (children) =>
    isMobile ? (
      children
    ) : (
      <TinySlider settings={sliderSettings}>{children}</TinySlider>
    );

  return (
    <CollectionPreviewContainer>
      <TitleContainer
        onClick={() => history.push(`${match.path}/${title.toLowerCase()}`)}
      >
        {title.toUpperCase()}
      </TitleContainer>
      {renderSlider(renderedItems)}
    </CollectionPreviewContainer>
  );
};

export default CollectionPreview;
