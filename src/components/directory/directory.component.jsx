import React from "react";

import "./directory.styles.scss";

import SECTION_DATA from "./sections.data";

import MenuItem from "../menu-item/menu-item.component";

const Directory = () => {
  const renderedItems = SECTION_DATA.map(({ id, ...sectionProps }) => {
    return <MenuItem key={id} {...sectionProps} />;
  });

  return <div className="directory-menu">{renderedItems}</div>;
};

export default Directory;
