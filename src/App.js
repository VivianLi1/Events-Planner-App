import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";


import "./App.css";
import "./Effects.css";

import EventContext from "./contexts/EventContext";
import eventData from "./Data";

import AboutPage from "./components/AboutPage";
import EventsPage from "./components/EventsPage";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";

function App() {

  const eventContext = useContext(EventContext);

	let fetchedEventsRef = useRef([]);
	const [currEvent, setCurrEvent] = useState(false);
	const [currUrl, setCurrUrl] = useState(`/discovery/v2/events?locale=*&sort=random&city=New%20York`);

	const testGetEvent = () => {
		const events = eventData._embedded.events;
        setCurrEvent(eventContext.getNewEvent(events[0]));
	};

	const setEvents = () => {
    return new Promise(resolve => {
      const getEvents = () => {
        async function makeGetRequest(url) {
          const axios = require("axios");
          let res = await axios.get(url);
    
          let data = res.data;
          //console.log(data)
          return data;
        }
    
        try{
          const getEventsPromise = makeGetRequest(`https://app.ticketmaster.com${currUrl}&apikey=${process.env.REACT_APP_TM_API_KEY}`);
          return getEventsPromise;
        }catch(e){
          console.log(e);
        }
      }

      const getEventsPromise = getEvents();
      getEventsPromise
        .then((data) => {
          fetchedEventsRef.current = data._embedded.events;
          setCurrUrl(data._links.hasOwnProperty('next') ? data._links.next.href.slice(0,data._links.next.href.length - 4) : "");
          resolve("get complete")
        })	
      })
	}

	const handleSearch = async () =>{
    await setEvents();
		setCurrEvent(eventContext.getNewEvent(fetchedEventsRef.current.shift()))		
	}

	const getNextEvent = async () => {
		if(fetchedEventsRef.current.length === 0){
			await setEvents();
		  setCurrEvent(eventContext.getNewEvent(fetchedEventsRef.current.shift()));	
		}else{	
			setCurrEvent(eventContext.getNewEvent(fetchedEventsRef.current.shift()));
		}
	}

	return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <AnimatePresence>  
          <Routes>
            <Route path="/" element={<HomePage handleSearch={handleSearch} getNextEvent={getNextEvent} currEvent={currEvent}/>}/>
            <Route path="myevents" element={<EventsPage />}/>
            <Route path="about" element={<AboutPage />}/>
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
	);
}

export default App;