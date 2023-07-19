import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import EmailRequest from "./EmailRequest";

describe("EmailRequest", () => {
  it("renders the email request form correctly", () => {
    render(
      <ChakraProvider>
        <EmailRequest />
      </ChakraProvider>
    );
    expect(screen.getByText("Recibir los resultados")).toBeInTheDocument();
    expect(screen.getByText("por e-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByText("Acepto la Política de privacidad")).toBeInTheDocument();
    expect(screen.getByText("Enviar")).toBeInTheDocument();
  });

  it("allows users to input an email address", () => {
    render(
      <ChakraProvider>
        <EmailRequest />
      </ChakraProvider>
    );

    const emailInput = screen.getByPlaceholderText("E-mail");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(emailInput.value).toBe("test@example.com");
  });

  it("toggles the switch for accepting privacy policy", () => {
    render(
      <ChakraProvider>
        <EmailRequest />
      </ChakraProvider>
    );

    const switchElement = screen.getByText("Acepto la Política de privacidad");
    fireEvent.click(switchElement);

    expect(switchElement).toBeInTheDocument();
  });
});
