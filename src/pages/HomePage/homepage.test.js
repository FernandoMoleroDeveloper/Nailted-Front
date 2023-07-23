import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders the homepage correctly", () => {
    render(
      <ChakraProvider>
        <Router>
          <HomePage />
        </Router>
      </ChakraProvider>
    );
    const titleElement = screen.getByText("Evalúa la madurez cultural de tu empresa");
    expect(titleElement).toBeInTheDocument();
    const paragraph1Element = screen.getByText("¡Descubre que podemos ofrecerte en Nailted!");
    expect(paragraph1Element).toBeInTheDocument();
    const paragraph2Element = screen.getByText("Sólo necesitamos unos pocos minutos, te mostramos una primera evaluación y cómo nuestra plataforma te ayudará a implementar una mejor madurez cultural.");
    expect(paragraph2Element).toBeInTheDocument();
    const logoImage = screen.getByAltText("Logo");
    expect(logoImage).toBeInTheDocument();
  });
});
