export default function EventsPageItem({eventObj, loggedIn, setLoggedIn}) {
    const gapi = window.gapi;

	const CLIENT_ID = "587124945315-i35limfh39fgktfn5tq7htkh45s3pglp.apps.googleusercontent.com";
	const CLIENT_SECRET = "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";
	const API_KEY = "AIzaSyBFpkwacrA11loWjIihGZSV_K9FT2AurPI";
	const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",];
	const SCOPES = "https://www.googleapis.com/auth/calendar.events";

	const handleClick = () => {

        if(!loggedIn){
            gapi.load("client:auth2", () => {
                console.log("loaded client");

                gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
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
		<div>
			{eventObj.name}
			<button><i className="fas fa-times"></i></button>
			<button onClick={handleClick}><i className="fas fa-calendar-plus"></i></button>
		</div>
	);
}