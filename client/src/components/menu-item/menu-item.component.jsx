import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  TitleContainer,
  SubtitleContainer,
} from "./menu-item.styles";

const MenuItem = ({ title, linkUrl, imageUrl, size }) => {
  const match = useRouteMatch();
  const history = useHistory();

  return (
    <MenuItemContainer
      size={size}
      onClick={() => history.push(match.url + linkUrl)}
    >
      <BackgroundImageContainer
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <ContentContainer>
        <TitleContainer>{title.toUpperCase()}</TitleContainer>
        <SubtitleContainer>SHOP NOW</SubtitleContainer>
      </ContentContainer>
    </MenuItemContainer>
  );
};

export default MenuItem;
