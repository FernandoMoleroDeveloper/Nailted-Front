import { Box, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const TextShort = ({ sessionId, question, previousResponse, setHasUserAnswered, setQuestionResponse, setErrorMessage }: any): JSX.Element => {
  const [text, setText] = useState("");

  const composeResponse = async (): Promise<void> => {
    await setQuestionResponse({
      question: question._id,
      session: sessionId,
      text: { textShort: text },
    });
  };

  useEffect(() => {
    if (previousResponse === undefined) {
      setText("");
    } else {
      setText(previousResponse?.text?.textShort);
    }
  }, [previousResponse]);

  useEffect(() => {
    void composeResponse();
    if (text.length > 0) {
      setHasUserAnswered(true);
    } else {
      setHasUserAnswered(false);
    }
  }, [text, sessionId]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrorMessage("");
    setText(event.target.value);
  };

  return (
    <div className="header">
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold" m="15">
        {question.questionText}
      </FormLabel>
      <Box display="flex" flexDirection="column" alignItems="start" m="15" mt={50}>
        <Textarea minLength={5} maxLength={80} value={text} margin="0 auto" maxWidth="500px" size="md" alignItems="center" textAlign="start" placeholder="Escribe aquí..." borderBottomColor="#0069D9" borderLeft="none" borderRadius="0" borderRight="none" borderTop="none" onChange={handleTextChange} />
      </Box>
      <FormHelperText fontSize={15} fontWeight={400}>{`Caracteres restantes: ${80 - text?.length}`}</FormHelperText>
    </div>
  );
};

export default TextShort;
