import React from "react";

import Search from "../../components/search/search.component";
import Directory from "../../components/directory/directory.component";

import { HomePageContainer } from "./homepage.styles";

const Homepage = () => {
  return (
    <HomePageContainer>
      <Search />
      <Directory />
    </HomePageContainer>
  );
};

export default Homepage;
