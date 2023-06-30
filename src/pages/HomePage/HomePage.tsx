import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { blueButton } from "../../styles/motions/props";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { motion } from "framer-motion";
import "./HomePage.scss";

const HomePage = (): JSX.Element => {
  return (
    <div className="home-page page">
      <Box className="home-page__header" boxShadow="md" p="3">
        <Header></Header>
      </Box>
      <Box className="home-page__container">
        <Box className="home-page__content">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <img className="home-page__photo" src="https://www.innovationinbusiness.com/wp-content/uploads/2022/08/Technology-inspire-teamwork.png" alt="" />
            <div className="home-page__slogan">
              <span>Evalue la madurez cultural de su empresa</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }}>
            <Box className="home-page__description">
              <p className="home-page__parragraph">Nuestros servicios están diseñados para impulsar la adopción de metodologías ágiles, fomentar un entorno de trabajo colaborativo y fortalecer la cultura de innovación.</p>
              <p className="home-page__parragraph">Dé el siguiente paso hacia la excelencia organizacional y desbloquee el potencial de su equipo con nuestras soluciones personalizadas.</p>
            </Box>
          </motion.div>
        </Box>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.8 }}>
          <Link to="/questionary" className="home-page__link">
            <Button {...blueButton} className="home-page__button center">
              Iniciar evaluación
            </Button>
          </Link>
        </motion.div>
      </Box>
      <Box className="home-page__footer">
        <Footer></Footer>
      </Box>
    </div>
  );
};

export default HomePage;
