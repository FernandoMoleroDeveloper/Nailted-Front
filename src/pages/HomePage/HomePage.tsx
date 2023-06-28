import { Box } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./HomePage.scss";

const HomePage = (): JSX.Element => {
  return (
    <div className="home-page page">
      <Box boxShadow="md" p="6" rounded="md" bg="white.50">
        <Header></Header>
      </Box>
      <div className="home-page__center-container"></div>
      <h1>prueba</h1>
      <Box boxShadow="md" p="6" rounded="md" bg="white.50">
        <Footer></Footer>
      </Box>
    </div>
  );
};

export default HomePage;
