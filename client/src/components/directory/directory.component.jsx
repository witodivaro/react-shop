import React, { useMemo } from "react";

import "./directory.styles.scss";

import MenuItem from "../menu-item/menu-item.component";

import { useQuery } from "@apollo/client";
import { GET_DIRECTORIES_DATA } from "../../graphql/directory/directory.queries";

const Directory = () => {
  const {
    data: { directories },
  } = useQuery(GET_DIRECTORIES_DATA);

  const renderedItems = useMemo(
    () =>
      directories.map(({ id, ...sectionProps }) => {
        return <MenuItem key={id} {...sectionProps} />;
      }),
    [directories]
  );

  return <div className="directory-menu">{renderedItems}</div>;
};

export default Directory;
