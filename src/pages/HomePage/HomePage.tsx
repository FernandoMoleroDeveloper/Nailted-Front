import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./HomePage.scss";

const HomePage = (): JSX.Element => {
  return (
    <div className="home-page page">
      <Header></Header>

      <Footer></Footer>
    </div>
  );
};

export default HomePage;
