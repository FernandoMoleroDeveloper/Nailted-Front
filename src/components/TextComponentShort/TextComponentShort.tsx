import { Box, FormHelperText, FormLabel, Input } from "@chakra-ui/react";

const TextComponentShort = (): JSX.Element => {
  return (
    <div className="header">
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold" m="15">
        ¿A que departamento perteneces?
      </FormLabel>
      <Box display="flex" flexDirection="column" alignItems="start" m="15">
        <Input variant="flushed" placeholder="Escribe aquí tu respuesta" width="350px" />
        <FormHelperText>Max 1000 caracteres</FormHelperText>
      </Box>
    </div>
  );
};

export default TextComponentShort;
