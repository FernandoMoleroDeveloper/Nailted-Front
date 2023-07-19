import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Results from "./Results";

describe("Results", () => {
  it("renders the 'Guardar resultados' button", () => {
    render(
      <ChakraProvider>
        <Results />
      </ChakraProvider>
    );

    const guardarResultadosButton = screen.getByText("Guardar resultados");
    expect(guardarResultadosButton).toBeInTheDocument();
  });

  it("opens the modal when clicking the 'Guardar resultados' button", () => {
    render(
      <ChakraProvider>
        <Results />
      </ChakraProvider>
    );

    const guardarResultadosButton = screen.getByText("Guardar resultados");
    fireEvent.click(guardarResultadosButton);
  });

  it("closes the modal when clicking the close button", () => {
    render(
      <ChakraProvider>
        <Results />
      </ChakraProvider>
    );

    const guardarResultadosButton = screen.getByText("Guardar resultados");
    fireEvent.click(guardarResultadosButton);

    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);
  });

  it("sends results when clicking the 'Enviar' button", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      status: 200,
    });

    render(
      <ChakraProvider>
        <Results />
      </ChakraProvider>
    );

    const guardarResultadosButton = screen.getByText("Guardar resultados");
    fireEvent.click(guardarResultadosButton);

    const emailInput = screen.getByPlaceholderText("Escribe tu email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const enviarButton = screen.getByText("Enviar");
    fireEvent.click(enviarButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it("displays an error message when the server response is not successful", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      status: 500,
    });

    render(
      <ChakraProvider>
        <Results />
      </ChakraProvider>
    );

    const guardarResultadosButton = screen.getByText("Guardar resultados");
    fireEvent.click(guardarResultadosButton);

    const emailInput = screen.getByPlaceholderText("Escribe tu email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const enviarButton = screen.getByText("Enviar");
    fireEvent.click(enviarButton);
  });
});
