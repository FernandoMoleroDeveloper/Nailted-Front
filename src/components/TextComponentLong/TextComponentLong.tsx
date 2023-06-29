import { Box, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react";

const TextComponentLong = (): JSX.Element => {
  return (
    <div className="header">
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold">
        ¿Cómo describirías tu relación con tu supervisor y que cosas cambiarías?
      </FormLabel>
      <Box display="flex" flexDirection="column" alignItems="start">
        <Textarea margin="0 auto" maxWidth="800px" height="300px" size="md" textAlign="start" boxShadow="base" placeholder="Escribe aquí..."/>
      </Box>
      <FormHelperText>Max 1000 caracteres</FormHelperText>
    </div>
  );
};

export default TextComponentLong;
