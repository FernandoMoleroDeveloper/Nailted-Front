import { Box, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react";

const TextComponentShort = (): JSX.Element => {
  return (
    <div className="header">
      <FormLabel textAlign="center" as="legend" fontSize="25px" fontWeight="extrabold">
        ¿A que departamento perteneces?
      </FormLabel>
      <Box display="flex" flexDirection="column" alignItems="start">
        <Textarea margin="0 auto" maxWidth="800px" size="md" alignItems="center" textAlign="start" placeholder="Escribe aquí..." borderBottomColor="#0069D9" borderLeft="none" borderRadius="0" borderRight="none" borderTop="none" />
      </Box>
      <FormHelperText>Max 1000 caracteres</FormHelperText>
    </div>
  );
};

export default TextComponentShort;
