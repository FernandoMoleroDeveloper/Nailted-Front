import { Box, Text } from "@chakra-ui/react";
import "../../../styles/layouts/SelectionBoxes.scss";
import SingleBox from "./SingleBox/SingleBox";
import { useEffect, useState } from "react";

const SelectionBoxes = ({ sessionId, question, previousResponse, setHasUserAnswered, setQuestionResponse, multiSelection }: any): React.JSX.Element => {
  const [optionSelected, setOptionSelected] = useState([]);

  const composeResponse = async (): Promise<void> => {
    await setQuestionResponse({
      question: question._id,
      session: sessionId,
      optionSelected,
    });
  };

  useEffect(() => {
    if (previousResponse === undefined) {
      setOptionSelected([]);
    } else {
      setOptionSelected(previousResponse?.optionSelected);
    }
  }, [previousResponse]);

  useEffect(() => {
    if (optionSelected?.length > 0 || (previousResponse?.optionSelected.length > 0 && optionSelected?.length === 0)) {
      console.log("1");
      setHasUserAnswered(true);
    } else if (optionSelected?.length === 0 && previousResponse?.optionSelected?.length > 0) {
      setOptionSelected(previousResponse?.optionSelected);
      setHasUserAnswered(true);
    }
    if (previousResponse?.optionSelected?.length === 0 && optionSelected?.length === 0) {
      console.log("3");
      setHasUserAnswered(false);
    }
    void composeResponse();
  }, [optionSelected, sessionId, previousResponse]);

  return (
    <>
      <Text textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold" m="0px auto">
        {question.questionText}
      </Text>
      {multiSelection ? (
        <Box display="flex" alignItems="center" justifyContent="center" m="0">
          <Text textAlign="center" as="legend" fontSize="17px" fontWeight="400" color="grey" marginTop="15px" >
            Puedes seleccionar varias opciones
          </Text>
        </Box>
      ) : null}
      <Box className="selection-boxes__container">
        {question?.options.map((option: any) => {
          return <SingleBox key={option._id} option={option} optionSelected={optionSelected} setOptionSelected={setOptionSelected} multiSelection={multiSelection}></SingleBox>;
        })}
      </Box>
    </>
  );
};

export default SelectionBoxes;
