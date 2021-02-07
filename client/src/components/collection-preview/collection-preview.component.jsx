import React, { useMemo } from 'react';

import TinySlider from 'tiny-slider-react';
import CollectionItem from '../collection-item/collection-item.component';

import {
  ItemContainer,
  CollectionPreviewContainer,
  TitleContainer,
} from './collection-preview.styles';

const ITEMS_AMOUNT_ON_PREVIEW = 4;
const TOTAL_ITEMS_AMOUNT = 8;

const CollectionPreview = ({ title, items }) => {
  const renderedItems = useMemo(() => {
    return items.slice(0, TOTAL_ITEMS_AMOUNT).map((item) => {
      return (
        <ItemContainer key={item.id}>
          <CollectionItem item={item} />
        </ItemContainer>
      );
    });
  }, [items]);

  return (
    <CollectionPreviewContainer>
      <TitleContainer>{title.toUpperCase()}</TitleContainer>
      <TinySlider
        className="preview"
        settings={{
          items: ITEMS_AMOUNT_ON_PREVIEW,
          controls: false,
          nav: false,
          autoplay: true,
          autoplayButtonOutput: false,
          autoplayTimeout: 2500,
          autoplayHoverPause: true,
          useLocalStorage: true,
        }}
      >
        {renderedItems}
      </TinySlider>
    </CollectionPreviewContainer>
  );
};

export default CollectionPreview;
