import { createContext, useReducer } from "react";

const EventContext = createContext();

export function EventContextProvider(props){

    const reducer = (prevEvents, action) =>{
        switch (action.type){
            //add event to events state
            case 'add':
                return [...prevEvents, action.payload];
            //remove event from events state
            case 'remove':
                return prevEvents.filter(event => {
                    return event.id !== action.payload;
                });
            default:
                return prevEvents;
        }
    }

    //users saved events
    const [events, dispatch] = useReducer(reducer, []);

    const getNewEvent = (newEvent) =>{
        // if no start time, don't add to fetched events list
        if(!newEvent.dates.start.hasOwnProperty('dateTime')){
            return false;
        }

        // parse ticketmaster data to event object
        const event = {
            id: newEvent.id,
            name: newEvent.name,
            url: newEvent.url,
            imageUrl: newEvent.images[0].url,
            startDates: {
                localDate: newEvent.dates.start.localDate,
                localTime: get12HrTime(newEvent.dates.start.localTime),
                dateTime: newEvent.dates.start.dateTime
            },
            endDates: newEvent.dates.hasOwnProperty('end') ? {
                localDate: newEvent.dates.end.localDate,
                localTime: newEvent.dates.end.localTime,
                dateTime: newEvent.dates.end.dateTime
            } : "none",
            //.currency, .min, .max
            priceRange: newEvent.hasOwnProperty('priceRanges') ? newEvent.priceRanges[0] : "",
            //.name, .timezone, .city, .state, .address, .location
            venue: newEvent.hasOwnProperty('_embedded') ? newEvent._embedded.venues[0]: ""
        };
        return event;
    }

    //parse datetime to 12 hour time
    const get12HrTime = (time) =>{
        console.log(time)
        let newTime = time.slice(0, 5);
        if(Number(newTime.slice(0, 2)) > 12){
            newTime = (Number(newTime.slice(0, 2)) - 12) + newTime.slice(2);
            newTime += " PM";
        }else{
            newTime += " AM";
        }
        return newTime;
    }

    return(
        <EventContext.Provider value={{events, dispatch, getNewEvent}}>
            {props.children}
        </EventContext.Provider>
    )
}

export default EventContext;