import { useContext } from "react";
import EventContext from "../contexts/EventContext";

export default function EventsPageItem({eventObj, loggedIn, setLoggedIn}) {

	const eventContext = useContext(EventContext);
    const gapi = window.gapi;

	const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",];
	const SCOPES = "https://www.googleapis.com/auth/calendar.events";

	const addToCalendar = () => {

        if(!loggedIn){
            gapi.load("client:auth2", () => {
                console.log("loaded client");

                gapi.client.init({
                    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
                    clientId: process.env.REACT_APP_CLIENT_ID,
                    clientSecret: process.env.REACT_APP_CLIENT_SECRET,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES,
                });

                gapi.client.load("calendar", "v3", () => console.log("bam!"));

                gapi.auth2
                    .getAuthInstance()
                    .signIn()
                    .then(() => {
                        setLoggedIn(true);
						createGCalEvent(eventObj);
                    });
            });
        }else{
			createGCalEvent(eventObj);
		}
	};

	const createGCalEvent = (eventObj) => {
		const event = {
			'summary': eventObj.name,
			'location': `${eventObj.venue.name} - ${eventObj.venue.city.name}, ${eventObj.venue.state.stateCode}`,
			'start': {
				'dateTime': eventObj.startDates.dateTime,
			},
			...(eventObj.endDates !== "none" ? {'end': {
				'dateTime': eventObj.endDates.dateTime,
				'timeZone': eventObj.timezone,
			}} : {'end': {
				'dateTime': getNextDay(eventObj.startDates.dateTime),
			}})
		};
		
		var request = gapi.client.calendar.events.insert({
			calendarId: "primary",
			resource: event,
		});

		request.execute((event) => {
			window.open(event.htmlLink);
		});
		
	};

	const getNextDay = (startDateTime) => {
		let date = new Date(startDateTime);
		console.log(date);
		date.setDate(date.getDate() + 1);
		return date.toISOString();
	}

	return (
		<div className="EventPageItem">
			<div className="EventPageItem--Info">
				<h2><a href={eventObj.url} rel="noreferrer" target="_blank">{eventObj.name}</a></h2>
				<div className="EventPageItem--DateTime">
					<p className="EventPageItem--Date">{eventObj.startDates.localDate}</p>
					<p>{eventObj.startDates.localTime}</p>
				</div>
			</div>
			<button className="icon icon--remove event--icon" onClick={() => eventContext.dispatch({type: "remove", payload: eventObj.id})}><i className="fas fa-times"></i></button>
			<button className="icon icon--calendar event--icon" onClick={addToCalendar}><i className="fas fa-calendar-plus"></i></button>
		</div>
	);
}