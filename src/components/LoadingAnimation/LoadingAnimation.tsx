import logoBall from "../../assets/logo circular.png";
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

/* <div className="quizz-page__loading">
  <div className="quizz-page__ball">
    <img className="quizz-page__top"></img>
  </div>
</div>; */
