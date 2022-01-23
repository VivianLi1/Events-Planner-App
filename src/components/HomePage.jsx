import { useContext, useState, useEffect, useRef } from "react";

import EventContext from "../contexts/EventContext";
import eventData from "../Data";

import Event from "./Event";

export default function HomePage() {
    
	const eventContext = useContext(EventContext);

	let fetchedEventsRef = useRef();
	const [currEvent, setCurrEvent] = useState(false);
	const [nextUrl, setNextUrl] = useState("");
	const [currUrl, setCurrUrl] = useState(`/discovery/v2/events?locale=*&sort=random&city=New%20York`);

	const testGetEvent = () => {
		const events = eventData._embedded.events;
        setCurrEvent(eventContext.getNewEvent(events[0]));
	};

	useEffect(() =>{

		const getEvent = () => {

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

		const getEventsPromise = getEvent();
		getEventsPromise
			.then((data) => {
				fetchedEventsRef.current = data._embedded.events;
				setNextUrl(data._links.hasOwnProperty('next') ? data._links.next.href.slice(0,data._links.next.href.length - 4) : "");
			})		
	}, [currUrl])

	const handleSearch = () =>{
		//console.log(fetchedEvents);
		console.log(fetchedEventsRef.current)
		if(fetchedEventsRef.current.length > 0){
			setCurrEvent(eventContext.getNewEvent(fetchedEventsRef.current.shift()));
		}else{
			setCurrUrl(nextUrl);
		}
	}

	return (
		<div>
			<button onClick={handleSearch}>Get Event</button>
			{currEvent && <Event eventObj={currEvent}/>}
		</div>
	);
}
