import { Box, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const TextLong = ({ setHasAnswered, question }: any): JSX.Element => {
  const [text, setText] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value.slice(0, 200);
    setText(newText);

    if (newText !== "") {
      setHasAnswered(true);
    } else {
      setHasAnswered(false);
    }
  };

  return (
    <div className="header">
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold" m="15">
        {question.questionText}
      </FormLabel>
      <Box display="flex" flexDirection="column" alignItems="start" m="15" mt={50}>
        <Textarea margin="0 auto" maxWidth="500px" size="md" alignItems="center" textAlign="start" placeholder="Escribe aquí..." borderBottomColor="#0069D9" borderLeft="none" borderRadius="0" borderRight="none" borderTop="none" onChange={handleTextChange} />
      </Box>
      <FormHelperText fontSize={15} fontWeight={400}>{`Caracteres restantes: ${200 - text.length}`}</FormHelperText>
    </div>
  );
};

export default TextLong;
