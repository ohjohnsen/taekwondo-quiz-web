import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MainPage from './pages/MainPage';
import TerminologyQuiz from './pages/TerminologyQuiz';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/terminologyquiz" element={<TerminologyQuiz />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App;
