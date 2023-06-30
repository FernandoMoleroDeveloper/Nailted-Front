import { Box } from "@chakra-ui/react";
import "../../styles/layouts/Header.scss";
import { Link } from "react-router-dom";

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <Box className="header__container">
        <Link to="/">
          <img className="header__img" src="https://nailted.com/assets/images/logo.svg"></img>
        </Link>
      </Box>
    </header>
  );
};

export default Header;
