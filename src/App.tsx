import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { createContext, useState } from "react";
import QuizzPage from "./pages/QuizzPage/QuizzPage";
import Results from "./components/Results/Results";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./pages/HomePage/HomePage";
import PdfPage from "./pages/PdfPage/PdfPage";

export const SessionIdContext = createContext<any>("");

function App(): JSX.Element {
  const [sessionId, setSessionId] = useState<any>("");

  const updateSessionId = (newSessionId: any) => {
    setSessionId(newSessionId);
  };

  return (
    <div className="app">
      <SessionIdContext.Provider value={{ sessionId, updateSessionId }}>
        <ChakraProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<HomePage></HomePage>}></Route>
              <Route path="/quizz" element={<QuizzPage></QuizzPage>}></Route>
              <Route path="/results" element={<Results></Results>}></Route>
              <Route path="/pdf" element={<PdfPage></PdfPage>}></Route>
            </Routes>
          </HashRouter>
        </ChakraProvider>
      </SessionIdContext.Provider>
    </div>
  );
}

export default App;
