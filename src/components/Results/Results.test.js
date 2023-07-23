import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Results from "./Results";
import { BrowserRouter as Router } from "react-router-dom";

describe("Results", () => {
  it("renders the Results page correctly", () => {
    render(
      <Router>
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      </Router>
    );
    const globalResults = screen.getByText("Resultado global");
    expect(globalResults).toBeInTheDocument();
  });

  it("opens the modal when clicking on 'Guardar resultados' button", async () => {
    render(
      <Router>
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      </Router>
    );
    const guardarResultadosButton = screen.getByText("Guardar resultados");
    fireEvent.click(guardarResultadosButton);
  });

  it("sends email and shows success toast when 'Enviar' button is clicked", async () => {
    render(
      <Router>
        <ChakraProvider>
          <Results />
        </ChakraProvider>
      </Router>
    );

    const guardarResultadosButton = screen.getByText("Guardar resultados");
    fireEvent.click(guardarResultadosButton);

    const companyNameInput = screen.getByPlaceholderText("Escribe el nombre de tu empresa");
    const emailInput = screen.getByPlaceholderText("Escribe tu email");
    fireEvent.change(companyNameInput, { target: { value: "Test Company" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const enviarButton = screen.getByText("Enviar");
    fireEvent.click(enviarButton);
  });
});
