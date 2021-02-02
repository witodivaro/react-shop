import React from "react";
import { withRouter } from "react-router-dom";

import {
  MenuItemContainer,
  BackgroundImageContainer,
  ContentContainer,
  TitleContainer,
  SubtitleContainer,
} from "./menu-item.styles";

const MenuItem = ({ title, linkUrl, imageUrl, size, history, match }) => {
  return (
    <MenuItemContainer onClick={() => history.push(match.url + linkUrl)}>
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

export default withRouter(MenuItem);
