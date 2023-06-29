import { Box } from "@chakra-ui/react";
import "./Header.scss";

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <Box className="header__container">
        <img className="header__img" src="https://nailted.com/assets/images/logo.svg"></img>
      </Box>
    </header>
  );
};

export default Header;
