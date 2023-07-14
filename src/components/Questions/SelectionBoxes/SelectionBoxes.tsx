import { Box, FormLabel } from "@chakra-ui/react";
import "../SelectionBoxes/SelectionBoxes.scss";
import SingleBox from "./SingleBox/SingleBox";
import { useEffect, useState } from "react";

const SelectionBoxes = ({ sessionId, question, setHasAnswered, setResponse, multiSelection }: any): JSX.Element => {
  const [optionsSelected, setOptionsSelected] = useState([]);

  useEffect(() => {
    optionsSelected.length > 0 ? setHasAnswered(true) : setHasAnswered(false);

    setResponse({
      question: question._id,
      session: sessionId,
      optionsSelected,
    });
  }, [optionsSelected, sessionId]);

  return (
    <>
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold" m="15">
        {question.questionText}
      </FormLabel>
      <Box className="selection-boxes__container">
        {question?.options.map((option: any) => {
          return <SingleBox key={option._id} option={option} optionsSelected={optionsSelected} setOptionsSelected={setOptionsSelected} multiSelection={multiSelection}></SingleBox>;
        })}
      </Box>
    </>
  );
};

export default SelectionBoxes;
