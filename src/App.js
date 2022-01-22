import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import AboutPage from "./components/AboutPage";
import EventsPage from "./components/EventsPage";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";

function App() {

	return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="home" element={<HomePage />}/>
          <Route path="myevents" element={<EventsPage />}/>
          <Route path="about" element={<AboutPage />}/>
        </Routes>
      </div>
    </BrowserRouter>
	);
}

export default App;
