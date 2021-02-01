import React from "react";

import Search from "../../components/search/search.component";
import Directory from "../../components/directory/directory.component";

import "./homepage.styles.scss";

const Homepage = () => {
  return (
    <div className="homepage">
      <Search />
      <Directory />
    </div>
  );
};

export default Homepage;
