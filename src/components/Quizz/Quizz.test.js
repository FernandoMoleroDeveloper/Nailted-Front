import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Quizz from "./Quizz";
import React from "react";

// Mocks para useContext y useState
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
  useState: jest.fn(),
}));

// Mock para useDisclosure de Chakra UI
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useDisclosure: jest.fn(),
}));

// Mock para fetch
global.fetch = jest.fn(
  async () =>
    await Promise.resolve({
      json: async () => await Promise.resolve({}),
      status: 201,
    })
);

describe("Quizz", () => {
  beforeEach(() => {
    // Implementación de los mocks
    React.useContext.mockImplementation(() => ({ updateSessionId: jest.fn(), updateToken: jest.fn() }));
    React.useState.mockImplementation((init) => [init, jest.fn()]);
    useDisclosure.mockImplementation(() => ({ isOpen: false, onOpen: jest.fn(), onClose: jest.fn() }));
  });

  it("renders without crashing", () => {
    render(<Quizz />);
  });

  it("shows loading animation initially", () => {
    const { getByTestId } = render(<Quizz />);
    expect(getByTestId("loading-animation")).toBeInTheDocument();
  });

  it("shows error message when fetch fails", async () => {
    // eslint-disable-next-line prefer-promise-reject-errors
    global.fetch.mockImplementationOnce(async () => await Promise.reject("API is down"));
    render(<Quizz />);
    await waitFor(() => {
      expect(screen.getByText("Error al iniciar el quizz.")).toBeInTheDocument();
    });
  });

  it("shows error message when response is not 201", async () => {
    global.fetch.mockImplementationOnce(
      async () =>
        await Promise.resolve({
          json: async () => await Promise.resolve({}),
          status: 500,
        })
    );
    render(<Quizz />);
    await waitFor(() => {
      expect(screen.getByText("La respuesta del servidor no fue la esperada. No se ha creado la sesion.")).toBeInTheDocument();
    });
  });

  it("calls nextQuestionActions when next button is clicked", () => {
    const { getByTestId } = render(<Quizz />);
    fireEvent.click(getByTestId("next-button"));
    expect(screen.getByText("Es necesario responder a la pregunta para poder continuar")).toBeInTheDocument();
  });

  it("calls previousQuestionRecoveringResponse when previous button is clicked", () => {
    const { getByTestId } = render(<Quizz />);
    fireEvent.click(getByTestId("previous-button"));
    // Asegúrate de que se llame a la función correcta o que se muestre el contenido correcto
  });

  // Añade más pruebas según sea necesario para cubrir todos los casos de uso y comportamientos esperados
});
