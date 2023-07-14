import { Box, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const TextShort = ({ sessionId, question, setHasAnswered, response, setResponse }: any): JSX.Element => {
  const [text, setText] = useState("");

  const updateResponse = async (): Promise<void> => {
    await setResponse({
      question: question._id,
      session: sessionId,
      text: { textShort: text },
    });
  };

  useEffect(() => {
    void updateResponse();
    console.log(response);
  }, [text, sessionId]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value.slice(0, 80);
    setText(newText);
    newText !== "" ? setHasAnswered(true) : setHasAnswered(false);
  };

  return (
    <div className="header">
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold" m="15">
        {question.questionText}
      </FormLabel>
      <Box display="flex" flexDirection="column" alignItems="start" m="15" mt={50}>
        <Textarea maxLength={80} margin="0 auto" maxWidth="500px" size="md" alignItems="center" textAlign="start" placeholder="Escribe aquí..." borderBottomColor="#0069D9" borderLeft="none" borderRadius="0" borderRight="none" borderTop="none" onChange={handleTextChange} />
      </Box>
      <FormHelperText fontSize={15} fontWeight={400}>{`Caracteres restantes: ${80 - text.length}`}</FormHelperText>
    </div>
  );
};

export default TextShort;
