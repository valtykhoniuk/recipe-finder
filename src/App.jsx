import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Favourites from "./pages/Favourites.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </div>
  );
}

export default App;
