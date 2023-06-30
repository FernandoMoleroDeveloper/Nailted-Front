import "../../styles/layouts/Footer.scss";
import { Box } from "@chakra-ui/react";

const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <Box className="footer__container">
        <p className="footer__text">© 2023 Nailted, todos los derechos reservados</p>
      </Box>
    </footer>
  );
};

export default Footer;
