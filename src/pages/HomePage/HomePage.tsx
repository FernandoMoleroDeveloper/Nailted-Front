import { Box } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./HomePage.scss";
import { NavLink } from "react-router-dom";

const HomePage = (): JSX.Element => {
  return (
    <div className="home-page page">
      <Box className="home-page__header" boxShadow="md" p="6" rounded="md" bg="w">
        <Header></Header>
      </Box>
      <div className="home-page__container">
        <p className="home-page__title">Evalue la</p>
        <p className="home-page__title">madurez cultural de su empresa</p>
        <NavLink to="/questionary" className="home-page__questionary">
          <Box w="300" color="blue">
            INICIAR EVALUACIÓN
          </Box>
        </NavLink>
      </div>
      <Box className="home-page__footer" boxShadow="md" p="6" rounded="md" bg="w">
        <Footer></Footer>
      </Box>
    </div>
  );
};

export default HomePage;
