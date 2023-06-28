import { Box, Button } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./HomePage.scss";

const HomePage = (): JSX.Element => {
  return (
    <div className="home-page page">
      <Box boxShadow="md" p="6" rounded="md" bg="w">
        <Header></Header>
      </Box>
      <p className="home-page__title">
        Evalue la<br></br>madurez cultural de su empresa
      </p>
      <Button size="sm" colorScheme="blue" variant="solid">
        Comenzar
      </Button>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
