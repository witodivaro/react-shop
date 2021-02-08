import React from "react";
import { Link } from "react-router-dom";

import {
  PageNotFoundContainer,
  ImageContainer,
  TextContainer,
  TitleContainer,
  LinkContainer,
} from "./page-not-found.styles";

const PageNotFound = () => {
  return (
    <PageNotFoundContainer>
      <ImageContainer imageUrl="https://i.imgur.com/lKJiT77.png" />
      <TitleContainer>This page was eaten by a dog</TitleContainer>
      <TextContainer>
        The page you are looking for doesn't exist. Probably, it was eaten by a
        dog.
      </TextContainer>
      <LinkContainer to="/">Return to home page</LinkContainer>
    </PageNotFoundContainer>
  );
};

export default PageNotFound;
