import { Box, Image } from "@chakra-ui/react";

const PdfPage = (): React.JSX.Element => {
  return (
    <>
      <Box className="results-page__container">
        <Box className="home-page__title">
          <p>Prueba</p>
        </Box>
        <Box>
          <Image src="https://nailted.com/assets/images/logo.svg" alt="Logo" className="home-page__logo"></Image>
        </Box>
      </Box>
    </>
  );
};

export default PdfPage;
