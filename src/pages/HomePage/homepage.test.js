import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

describe("HomePage", () => {
  it("renders the home page correctly", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText("Evalúa la madurez cultural de tu empresa")).toBeInTheDocument();
    expect(screen.getByText("¡Descubre qué podemos ofrecerte en Nailted con este formulario! Solo necesitamos unos pocos minutos, te damos una primera evaluación y te mostramos cómo nuestra plataforma te ayudará a implementar una mejor madurez cultural.")).toBeInTheDocument();
    expect(screen.getByText("Iniciar evaluación")).toBeInTheDocument();
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });
});
