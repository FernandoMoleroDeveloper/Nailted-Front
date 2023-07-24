import logoBall from "../../assets/logo-circular.png";
import "../../styles/layouts/LoadingAnimation.scss";

const LoadingAnimation = (): React.JSX.Element => {
  return (
    <>
      <div className="loading">
        <div className="loading__loader">
          <img src={logoBall} className="loading__ball"></img>
        </div>
      </div>
    </>
  );
};

export default LoadingAnimation;
