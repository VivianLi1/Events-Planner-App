import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import "./App.css";
import "./Effects.css";

import EventContext from "./contexts/EventContext";

import AboutPage from "./components/AboutPage";
import EventsPage from "./components/EventsPage";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";

function App() {

  const eventContext = useContext(EventContext);

	let fetchedEventsRef = useRef([]);
  //state to check if there are events to show
  const [eventStatus, setEventStatus] = useState("");
  // current event object
	const [currEvent, setCurrEvent] = useState(false);
  // current url fetched
	const [currUrl, setCurrUrl] = useState("");
  // next page of pagination
  const [nextUrl, setNextUrl] = useState("");
  // if url is the same but search is clicked toggle will trigger
  const [searchToggle, setSearchToggle] = useState(false);

  //useEffect triggers when currUrl changes or searchToggle changes
  useEffect(() =>{
    if(currUrl !== ""){
      async function makeGetRequest(url) {
        const axios = require("axios");

        try{
          // make api call to ticketmaster api
          let res = await axios.get(url);
          // no events found
          if(res.data.page.totalElements === 0){
            setEventStatus("no events");
          }else{
            // hold fetched events in a ref array
            fetchedEventsRef.current = res.data._embedded.events;
            // set next url in pagination (needs to be cleaned because of kink in json next url)
            setNextUrl(res.data._links.hasOwnProperty('next') ? res.data._links.next.href.slice(0, res.data._links.next.href.length - 4) : "");

            // ensures event is valid 
            let event = eventContext.getNewEvent(fetchedEventsRef.current.shift())
            while(!event){
              event = eventContext.getNewEvent(fetchedEventsRef.current.shift())
            }
            setCurrEvent(event);
          }
        }catch(err){
          console.log(err);
        }
      }

      makeGetRequest(`https://app.ticketmaster.com${currUrl}&apikey=${process.env.REACT_APP_TM_API_KEY}`);
    }
  }, [currUrl, searchToggle])

  const generateUrl = (formData) => {

    // cleans date formate form .ISOString to appropriate date for TM api call
    const formateDate = (date) =>{
      return date.substring(0, date.length - 5) + "Z";
    }

    const keyword = formData.query;
    const city = formData.city;
    const startDateTime = formData.startDate;
    const endDateTime = formData.endDate;

    let url = "/discovery/v2/events?locale=*&sort=random";
    url += (keyword ? `&keyword=${keyword}` : "");
    url += (city ? `&city=${city}` : "");
    url += (startDateTime ? `&startDateTime=${formateDate(new Date(startDateTime).toISOString())}` : "");
    url += (endDateTime ? `&endDateTime=${formateDate(new Date(endDateTime).toISOString())}` : "");
  
    // if currUrl is the same as formulated url, toggle searchToggle so useEffect still runs
    if(currUrl !== url){
      setCurrUrl(url);
    }else{
      setSearchToggle(prev => !prev)
    }
    // if no keyword, set keyword to "all events"
    setEventStatus(keyword ? keyword : "all events");
  }

	const handleSearch = (formData) =>{
    generateUrl(formData);	
	}

	const getNextEvent = async () => {
    // if there are no more events in fetchedEvents, get next page in pagination (if possible)
		if(fetchedEventsRef.current.length === 0){
      if(nextUrl !== ""){
		    setCurrUrl(nextUrl)
      }else{
        setEventStatus("no more events")
        setCurrEvent(false)
      }
		}else{
      // ensures event is valid
      let event = eventContext.getNewEvent(fetchedEventsRef.current.shift())
      while(!event){
        event = eventContext.getNewEvent(fetchedEventsRef.current.shift())
      }
			setCurrEvent(event);
		}
	}

	return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <AnimatePresence>  
          <Routes>
            <Route path="/" element={<HomePage handleSearch={handleSearch} getNextEvent={getNextEvent} eventStatus={eventStatus} currEvent={currEvent} setCurrEvent={setCurrEvent}/>}/>
            <Route path="myevents" element={<EventsPage />}/>
            <Route path="about" element={<AboutPage />}/>
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
	);
}

export default App;