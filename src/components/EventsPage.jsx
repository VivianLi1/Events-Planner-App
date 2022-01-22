import { useContext, useState } from "react";
import EventContext from "../contexts/EventContext";
import EventsPageItem from "./EventsPageItem";

export default function EventsPage() {
	const eventContext = useContext(EventContext);

	const [loggedIn, setLoggedIn] = useState(false);

    return(
        <div>
            
            {eventContext.events.map(event =>{
                return <EventsPageItem eventObj={event} loggedIn={loggedIn} setLoggedIn={setLoggedIn} key={event.id}/>
            })}
        </div>
    )

}
