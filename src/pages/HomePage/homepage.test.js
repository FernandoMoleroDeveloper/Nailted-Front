import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import HomePage from "../HomePage/HomePage";

describe("HomePage component", () => {
  it("renders HomePage", () => {
    const { getByAltText, getByText } = render(
      <Router history={createMemoryHistory()}>
        <HomePage />
      </Router>
    );

    // Comprueba que se renderiza la imagen principal
    expect(getByAltText("Home Image")).toBeInTheDocument();

    // Comprueba que se renderiza el logo
    expect(getByAltText("Logo")).toBeInTheDocument();

    // Comprueba que el título y el texto se renderizan
    expect(getByText("Evalúa la madurez cultural de tu empresa")).toBeInTheDocument();
    expect(getByText("¡Descubre que podemos ofrecerte en Nailted!")).toBeInTheDocument();
    expect(getByText("Sólo necesitamos unos pocos minutos, te mostramos una primera evaluación y cómo nuestra plataforma te ayudará a implementar una mejor madurez cultural.")).toBeInTheDocument();

    // Comprueba que el botón se renderiza
    const button = getByText("Iniciar evaluación");
    expect(button).toBeInTheDocument();
  });

  it("navigates to /quizz when start button is clicked", () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <HomePage />
      </Router>
    );

    // Simula un clic en el botón
    fireEvent.click(getByText("Iniciar evaluación"));

    // Comprueba que la URL ha cambiado a /quizz
    expect(history.location.pathname).toBe("/quizz");
  });
});
