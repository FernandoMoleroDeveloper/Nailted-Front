import { Box, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { blueButton, slideX, slideY } from "../../styles/motions/props";
import "../../styles/layouts/HomePage.scss";
import homeImage from "../../assets/home-img.png";
import { motion } from "framer-motion";

const HomePage = (): JSX.Element => {
  return (
    <div className="home-page page">
      <motion.div {...slideY("up", "0.5", "0")}>
        <Box className="home-page__container">
          <Box className="home-page__head">
            <div className="home-page__imgbox">
              <Image src={homeImage} mb="0" alt="Home Image" className="home-page__img" />
            </div>
            <Box className="home-page__title">
              <p>Evalúa la madurez cultural de tu empresa</p>
            </Box>
          </Box>

          <motion.div {...slideX("right", "0.5", "0.5")}>
            {" "}
            {/* Coming from, duration, delay */}
            <Box className="home-page__text">
              <p>¡Descubre qué podemos ofrecerte en Nailted con este formulario! Solo necesitamos unos pocos minutos, te damos una primera evaluación y te mostramos cómo nuestra plataforma te ayudará a implementar una mejor madurez cultural.</p>
            </Box>
          </motion.div>

          <Link to="/quizz" className="home-page__link">
            <Button {...blueButton} className="home-page__button center">
              Iniciar evaluación
            </Button>
          </Link>
        </Box>
        <Box>
          <Image src="https://nailted.com/assets/images/logo.svg" alt="Logo" className="home-page__logo"></Image>
        </Box>
      </motion.div>
    </div>
  );
};

export default HomePage;
