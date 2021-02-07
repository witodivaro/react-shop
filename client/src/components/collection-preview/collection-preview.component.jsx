import React, { useMemo } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import TinySlider from 'tiny-slider-react';
import CollectionItem from '../collection-item/collection-item.component';

import {
  ItemContainer,
  CollectionPreviewContainer,
  TitleContainer,
} from './collection-preview.styles';

const ITEMS_AMOUNT_ON_PREVIEW = 4;

const CollectionPreview = ({ title, items }) => {
  const history = useHistory();
  const match = useRouteMatch();

  const renderedItems = useMemo(() => {
    return items.map((item) => {
      return (
        <ItemContainer key={item.id}>
          <CollectionItem item={item} />
        </ItemContainer>
      );
    });
  }, [items]);

  return (
    <CollectionPreviewContainer>
      <TitleContainer
        onClick={() => history.push(`${match.path}/${title.toLowerCase()}`)}
      >
        {title.toUpperCase()}
      </TitleContainer>
      <TinySlider
        className="preview"
        settings={{
          items: ITEMS_AMOUNT_ON_PREVIEW,
          controls: false,
          nav: false,
          autoplay: true,
          autoplayButtonOutput: false,
          autoplayTimeout: 5000,
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
