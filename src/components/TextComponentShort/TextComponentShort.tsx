
import { Box, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

const TextComponentShort = (): JSX.Element => {
  const [text, setText] = useState("");

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value.slice(0, 80));
  };

  return (
    <div className="header">
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold" m="15">
        ¿A qué departamento perteneces?
      </FormLabel>
      <Box display="flex" flexDirection="column" alignItems="start" m="15">
        <Input variant="flushed" placeholder="Escribe aquí tu respuesta" width="350px" />
        <FormHelperText>{`Caracteres restantes: ${80 - text.length}`}</FormHelperText>
      </Box>

    </div>
  );
};

export default TextComponentShort;
