import "../../styles/layouts/QuizzPage.scss";
import Quizz from "../../components/Quizz/Quizz";

const QuizzPage = (): React.JSX.Element => {
  return (
    <div className="quizz-page page">
      <Quizz></Quizz>
    </div>
  );
};
export default QuizzPage;
