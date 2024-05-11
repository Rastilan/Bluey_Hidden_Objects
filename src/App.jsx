import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";
import EpisodeDetails from "./components/EpisodeDetails";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Home />} path="/home" />
          <Route
            path="/episodelist/:season/:episode"
            element={<EpisodeDetails />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
