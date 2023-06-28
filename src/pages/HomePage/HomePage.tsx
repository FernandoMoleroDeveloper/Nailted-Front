import { Box, Button } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./HomePage.scss";
import { NavLink } from "react-router-dom";

const HomePage = (): JSX.Element => {
  return (
    <div className="home-page page">
      <Box boxShadow="md" p="6" bg="w">
        <Header></Header>
      </Box>
      <p className="home-page__title">
        Evalue la<br></br>madurez cultural de su empresa
      </p>
      <NavLink to="/questionary" className="home-page_questionary">
        <Button size="sm" colorScheme="blue" variant="solid">
          Comenzar
        </Button>
      </NavLink>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
