import { Box } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./HomePage.scss";
import { Link } from "react-router-dom";

const HomePage = (): JSX.Element => {
  return (
    <div className="home-page page">
      <Box className="home-page__header" boxShadow="md" p="6" bg="w">
        <Header></Header>
      </Box>
      <div className="home-page__container">
        <p className="home-page__title">Evalue la madurez cultural de su empresa</p>
        <Link to="/questionary" className="home-page__questionary">
          <Box
            as="button"
            height="70px"
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            border="1px"
            px="15px"
            borderRadius="10px"
            fontSize="14px"
            fontWeight="semibold"
            bg="#0469da"
            color="#ffff"
            _hover={{ bg: "#199bf6" }}
            _active={{
              bg: "#dddfe2",
              transform: "scale(0.98)",
            }}
            _focus={{
              boxShadow: "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
            }}
          >
            INICIAR EVALUACIÓN
          </Box>
        </Link>
      </div>
      <Box className="home-page__footer" boxShadow="md" p="6" rounded="md" bg="w">
        <Footer></Footer>
      </Box>
    </div>
  );
};

export default HomePage;
