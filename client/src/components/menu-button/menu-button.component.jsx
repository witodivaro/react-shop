import React from "react";

import { MenuButtonContainer } from "./menu-button.styles";

const MenuButton = ({ open, setOpen }) => {
  return (
    <MenuButtonContainer open={open} onClick={() => setOpen(!open)}>
      <span />
      <span />
      <span />
    </MenuButtonContainer>
  );
};

export default MenuButton;
