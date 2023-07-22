import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { createContext, useState } from "react";
import QuizzPage from "./pages/QuizzPage/QuizzPage";
import Results from "./components/Results/Results";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./pages/HomePage/HomePage";

export const SessionIdContext = createContext<any>("");
export const TokenContext = createContext<any>("");

function App(): JSX.Element {
  const [sessionId, setSessionId] = useState<any>("");
  const [token, setToken] = useState<any>("");

  const updateSessionId = (newSessionId: any) => {
    setSessionId(newSessionId);
  };

  const updateToken = (newToken: any) => {
    setToken(newToken);
  };

  return (
    <div className="app">
      <SessionIdContext.Provider value={{ sessionId, updateSessionId }}>
        <TokenContext.Provider value={{ token, updateToken }}>
          <ChakraProvider>
            <HashRouter>
              <Routes>
                <Route path="/" element={<HomePage></HomePage>}></Route>
                <Route path="/quizz" element={<QuizzPage></QuizzPage>}></Route>
                <Route path="/results" element={<Results></Results>}></Route>
              </Routes>
            </HashRouter>
          </ChakraProvider>
        </TokenContext.Provider>
      </SessionIdContext.Provider>
    </div>
  );
}

export default App;
