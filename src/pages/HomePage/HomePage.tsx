import { Box, Button } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./HomePage.scss";

const HomePage = (): JSX.Element => {
  return (
    <div className="home-page page">
      <Box className="home-page__header" boxShadow="md" p="6" rounded="md" bg="w">
        <Header></Header>
      </Box>
      <div className="home-page__container">
        <p className="home-page__title">
          Evalue la<br></br>madurez cultural de su empresa
        </p>
        <Button size="sm" colorScheme="blue" variant="solid">
          Comenzar
        </Button>
      </div>
      <Box className="home-page__footer" boxShadow="md" p="6" rounded="md" bg="w">
        <Footer></Footer>
      </Box>
    </div>
  );
};

export default HomePage;
