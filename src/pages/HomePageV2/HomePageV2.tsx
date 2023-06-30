import { Box, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { blueButton } from "../../styles/motions/props";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "../../styles/layouts/HomePageV2.scss";
import { Slide } from "react-awesome-reveal";
import homeImage from "../../assets/homeImage.jpg";

const HomePageV2 = (): JSX.Element => {
  return (
    <div className="home-page page">
      <Box className="home-page__header" boxShadow="md" p="3">
        <Header></Header>
      </Box>
      <Slide direction="up">
        <Box className="home-page__container">
          <div className="home-page__imgbox">
            <Image src={homeImage} alt="Home Image" className="home-page__img" />
          </div>
          <Box className="home-page__title">
            <p>Evalua la madurez cultural de tu empresa</p>
          </Box>
          <Slide direction="right">
            <Box className="home-page__text">
              <p>¡Descúbre que podemos ofrecerte en Nailted con este formulario! Solo necesitamos unos pocos minutos, te damos una primera evaluación y te mostramos cómo nuestra plataforma te ayudará a implementar una mejor madurez cultural.</p>
            </Box>
          </Slide>

          <Link to="/questionary" className="home-page__link">
            <Button {...blueButton} className="home-page__button center">
              Iniciar evaluación
            </Button>
          </Link>
        </Box>
      </Slide>
      <Box className="home-page__footer">
        <Footer></Footer>
      </Box>
    </div>
  );
};

export default HomePageV2;
