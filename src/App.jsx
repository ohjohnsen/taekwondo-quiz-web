import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import TerminologyPage from "./pages/TerminologyPage";
import TerminologyQuizPage from "./pages/TerminologyQuizPage";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/terminology" element={<TerminologyPage />} />
          <Route exact path="/terminologyquiz" element={<TerminologyQuizPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App;
