import { Box, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const TextComponentLong = (): JSX.Element => {
  const [text, setText] = useState("");

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value.slice(0, 200));
  };

  return (
    <div className="header">
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold" m="15">
        ¿Cómo describirías tu relación con tu supervisor y qué cosas cambiarías?
      </FormLabel>
      <Box display="flex" flexDirection="column" alignItems="start" m="15">
        <Textarea margin="0 auto" maxWidth="500px" size="md" alignItems="center" textAlign="start" placeholder="Escribe aquí..." borderBottomColor="#0069D9" borderLeft="none" borderRadius="0" borderRight="none" borderTop="none" />
      </Box>
      <FormHelperText>{`Caracteres restantes: ${200 - text.length}`}</FormHelperText>
    </div>
  );
};

export default TextComponentLong;
