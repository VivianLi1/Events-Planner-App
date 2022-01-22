import { useContext } from "react";
import EventContext from "../contexts/EventContext";

export default function Event({eventObj}){

    const eventContext = useContext(EventContext);

    return(
        <div className="Event">
            <button className="icon icon--dislike event--icon"><i className="fas fa-times"></i></button>

            <div className="EventCard">
                <div className="EventCard--contentDiv">
                    <img src={eventObj.imageUrl} alt="event"/>

                    <div className="Event--Title">
                        <h2><a href={eventObj.url}>{eventObj.name}</a></h2>
                        <p>{eventObj.venue.name}</p>
                    </div>

                    <div className="Event--Info">
                        <div className="Event--Date">
                            <p>{eventObj.startDates.localDate}</p>
                            <p>{eventObj.startDates.localTime}</p>
                        </div>
                        <div className="Event--Price">
                            {eventObj.priceRange && <p>from <span>${eventObj.priceRange.min}</span></p>}
                        </div>
                    </div>
                </div>
            </div>

            <button className="icon icon--like event--icon" onClick={() => eventContext.dispatch({type: "add", payload: eventObj})}>
                <i className="fas fa-heart"></i>
            </button>
        </div>
    )
}