import { Box, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

interface TextShortProps {
  onAnswer: (answer: string) => void;
}

const TextShort = ({ onAnswer }: TextShortProps): JSX.Element => {
  const [text, setText] = useState("");

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newText = event.target.value.slice(0, 80);
    setText(newText);
    onAnswer(newText);
  };

  return (
    <div className="header">
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold" m="15">
        ¿A qué departamento perteneces?
      </FormLabel>
      <Box display="flex" flexDirection="column" alignItems="center" m="15" mt="90">
        <Input variant="flushed" placeholder="Escribe aquí tu respuesta" width="350px" value={text} onChange={handleTextChange} />
        <FormHelperText fontSize={15} fontWeight={400}>{`Caracteres restantes: ${80 - text.length}`}</FormHelperText>
      </Box>
    </div>
  );
};

export default TextShort;
