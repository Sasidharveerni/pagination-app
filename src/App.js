import { BrowserRouter, Route,  Routes } from "react-router-dom";
import Product from "./components/Product";
import News from './components/News';
import Timer from "./components/Timer";

const App = () => {
 

  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Product />} />
      <Route path="/news" element={<News />} />
      <Route path="/countdown" element={<Timer />} />
    </Routes>
    
    </BrowserRouter>
  );
};

export default App;
