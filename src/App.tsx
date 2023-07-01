import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import FormPage from "./pages/FormPage/FormPage";
import Results from "./components/Results/Results";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./pages/HomePage/HomePage";

function App(): JSX.Element {
  return (
    <div className="app">
      <ChakraProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/questionary" element={<FormPage></FormPage>}></Route>
            <Route path="/results" element={<Results></Results>}></Route>
          </Routes>
        </HashRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
