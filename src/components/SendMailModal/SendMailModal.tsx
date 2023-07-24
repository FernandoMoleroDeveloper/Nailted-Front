import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Link } from "@chakra-ui/layout";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/modal";
import { Switch } from "@chakra-ui/switch";
import { SlideFade } from "@chakra-ui/transition";
import { sendButton } from "../../styles/motions/props";

const SendMailModal = ({ initialRef, isOpen, onClose, correctEmail, policyAccepted, setPolicyAccepted, companyName, handleCompanyNameChange, email, handleEmailChange, handleSendResults }: any) => {
  return (
    <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent m="auto 20px">
        <ModalHeader>Guardar resultados</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="20px 20px">
          <Box textAlign="center" p="0px 5px" fontSize="20px">
            Te enviaremos un email con un enlace y certificado para que puedas consultar tus resultados cuando quieras.
          </Box>
          <FormControl>
            <FormLabel padding="0px" margin="40px 0px 0px 0px">Nombre de la empresa (opcional)</FormLabel>
            <Input m="5px 0px 0px 0px" maxLength={30} placeholder="Tu Empresa S.L." value={companyName} onChange={handleCompanyNameChange} />
          </FormControl>
          <FormControl>
            <FormLabel padding="0px" margin="10px 0px 0px 0px">Dirección de correo</FormLabel>
            <Input ref={initialRef} m="5px 0px 0px 0px" placeholder="tuemail@email.com" value={email} onChange={handleEmailChange} />
            <SlideFade in={correctEmail === false}>
              <Box textAlign="center" color="red">
                Introduce un email válido
              </Box>
            </SlideFade>
          </FormControl>
        </ModalBody>
        <Flex alignItems="center" margin="0px auto">
          <Switch
            colorScheme="teal"
            size="md"
            onChange={() => {
              setPolicyAccepted(!policyAccepted);
            }}
          />
          <Link marginLeft="10px" href="https://nailted.com/es/legal/privacy" isExternal>
            Política de privacidad
          </Link>
        </Flex>
        <SlideFade in={policyAccepted === false}>
          <Box textAlign="center" color="red">
            Debes aceptar la política de privacidad.
          </Box>
        </SlideFade>
        <ModalFooter>
          <Button {...sendButton} p="25px 4px" colorScheme="blue" m="10px auto" onClick={handleSendResults}>
            Enviar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SendMailModal;
