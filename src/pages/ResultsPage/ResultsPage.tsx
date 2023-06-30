import { Box, Button, CircularProgress, CircularProgressLabel, Divider, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, useDisclosure } from "@chakra-ui/react";
// import Footer from "../../components/Footer/Footer";
// import Header from "../../components/Header/Header";
import "./ResultsPage.scss";
import { blueButton } from "../../styles/motions/props";
import { BiSolidPlusCircle } from "react-icons/bi";
import { RiMailSendLine } from "react-icons/ri";
import { useState } from "react";

const ResultsPage = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="results-page page">
      {/* <Box className="results-page__header" boxShadow="md" p="3">
        <Header></Header>
      </Box> */}
      <Progress value={20} size="xs" colorScheme="#0469da" />
      <Box className="results-page__container">
        <FormControl as="fieldset">
          <FormLabel fontSize="24px" textColor="#199bf6" fontWeight="extrabold" margin="0px auto" textAlign="center" as="legend">
            Resultado general
          </FormLabel>
          <CircularProgress className="results-page__progress-circle" value={49.2} color="orange.400" size="150px" thickness="10px">
            <CircularProgressLabel>49,2%</CircularProgressLabel>
          </CircularProgress>
          <Divider className="results-page__horizontal-divider" />
          <Box display="flex" flexWrap="wrap">
            <Box display="flex" justifyContent="space-between" marginTop="20px">
              <Box width="40%" display="flex" alignItems="center">
                <CircularProgress className="results-page__progress-circle" value={62} color="green.400" size="65px" thickness="8px">
                  <CircularProgressLabel>62%</CircularProgressLabel>
                </CircularProgress>
                <Box display="flex" flexWrap="wrap" margin="0 0 0 5px">
                  <Box display="flex" alignItems="center">
                    <FormLabel fontWeight="extrabold" margin="0 5px 0 0" textAlign="left" as="legend">
                      Direction
                    </FormLabel>
                    <BiSolidPlusCircle
                      onClick={() => {
                        onOpen();
                        setText("Direction text");
                        setTitle("Direction");
                      }}
                      color="#199bf6"
                    />
                  </Box>
                  <FormLabel>Prueba</FormLabel>
                </Box>
              </Box>
              <Box width="40%" display="flex" alignItems="center">
                <CircularProgress className="results-page__progress-circle" value={48} color="orange.400" size="65px" thickness="8px">
                  <CircularProgressLabel>48%</CircularProgressLabel>
                </CircularProgress>
                <Box display="flex" flexWrap="wrap" margin="0 0 0 5px">
                  <Box display="flex" alignItems="center">
                    <FormLabel fontWeight="extrabold" margin="0 5px 0 0" textAlign="left" as="legend">
                      Feedback
                    </FormLabel>
                    <BiSolidPlusCircle
                      onClick={() => {
                        onOpen();
                        setText("Feedback text");
                        setTitle("Feedback");
                      }}
                      color="#199bf6"
                    />
                  </Box>
                  <FormLabel>Prueba</FormLabel>
                </Box>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" marginTop="20px">
              <Box width="40%" display="flex" alignItems="center">
                <CircularProgress className="results-page__progress-circle" value={36} color="orange.400" size="65px" thickness="8px">
                  <CircularProgressLabel>36%</CircularProgressLabel>
                </CircularProgress>
                <Box display="flex" flexWrap="wrap" margin="0 0 0 5px">
                  <Box display="flex" alignItems="center">
                    <FormLabel fontWeight="extrabold" margin="0 5px 0 0" textAlign="left" as="legend">
                      Recognition
                    </FormLabel>
                    <BiSolidPlusCircle
                      onClick={() => {
                        onOpen();
                        setText("Recognition text");
                        setTitle("Recognition");
                      }}
                      color="#199bf6"
                    />
                  </Box>
                  <FormLabel>Prueba</FormLabel>
                </Box>
              </Box>
              <Box width="40%" display="flex" alignItems="center">
                <CircularProgress className="results-page__progress-circle" value={22} color="red.400" size="65px" thickness="8px">
                  <CircularProgressLabel>22%</CircularProgressLabel>
                </CircularProgress>
                <Box display="flex" flexWrap="wrap" margin="0 0 0 5px">
                  <Box display="flex" alignItems="center">
                    <FormLabel fontWeight="extrabold" margin="0 5px 0 0" textAlign="left" as="legend">
                      Wellness
                    </FormLabel>
                    <BiSolidPlusCircle
                      onClick={() => {
                        onOpen();
                        setText("Wellness text");
                        setTitle("Wellness");
                      }}
                      color="#199bf6"
                    />
                  </Box>
                  <FormLabel>Prueba</FormLabel>
                </Box>
              </Box>
            </Box>
            <Box display="flex" margin="20px auto 0 0" justifyContent="flex-end">
              <Box width="40%" display="flex" alignItems="center">
                <CircularProgress className="results-page__progress-circle" value={78} color="green.400" size="65px" thickness="8px">
                  <CircularProgressLabel>78%</CircularProgressLabel>
                </CircularProgress>
                <Box display="flex" flexWrap="wrap" margin="0 0 0 5px">
                  <Box display="flex" alignItems="center">
                    <FormLabel fontWeight="extrabold" margin="0 5px 0 0" textAlign="left" as="legend">
                      Career
                    </FormLabel>
                    <BiSolidPlusCircle
                      onClick={() => {
                        onOpen();
                        setText("Career text");
                        setTitle("Carrer");
                      }}
                      color="#199bf6"
                    />
                  </Box>
                  <FormLabel>Prueba</FormLabel>
                </Box>
              </Box>
            </Box>
          </Box>
          <FormHelperText marginTop="40px">Be better, my friend!</FormHelperText>
          <Input placeholder="Email" borderRadius="20px"></Input>
          <Button {...blueButton} rightIcon={<RiMailSendLine />} className="results-page__button center">
            Enviar
          </Button>
        </FormControl>
      </Box>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{text}</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* <Box className="results-page__footer">
        <Footer></Footer>
      </Box> */}
    </div>
  );
};
export default ResultsPage;
