import { Box, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react";

const TextComponentShort = (): JSX.Element => {
  return (
    <div className="header">
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold">
        ¿A que departamento perteneces?
      </FormLabel>
      <Box display="flex" flexDirection="column" alignItems="start">
        <Textarea maxWidth="800px" size="md" alignItems="center" textAlign="start" boxShadow="base" placeholder="Escribe aquí..."/>
      </Box>
      <FormHelperText>Max 1000 caracteres</FormHelperText>
    </div>
  );
};

export default TextComponentShort;
