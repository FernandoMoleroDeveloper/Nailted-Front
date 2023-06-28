import { Box } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./HomePage.scss";

const HomePage = (): JSX.Element => {
  return (
    <div className="home-page page">
      <Box boxShadow="md" p="6" rounded="md" bg="gray.50">
        <Header></Header>
      </Box>
      <h1>prueba</h1>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
