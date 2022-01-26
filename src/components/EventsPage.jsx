import { useContext, useState } from "react";
import { motion } from "framer-motion";
import {pageVariants, pageTransition} from '../FramerAnimations';

import EventContext from "../contexts/EventContext";
import EventsPageItem from "./EventsPageItem";

export default function EventsPage() {
	const eventContext = useContext(EventContext);

	const [loggedIn, setLoggedIn] = useState(false);

    return(
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {eventContext.events.length === 0 ? 
                <h2 className="NoEvents">no events yet :(</h2> :
                eventContext.events.map(event =>{
                    return <EventsPageItem eventObj={event} loggedIn={loggedIn} setLoggedIn={setLoggedIn} key={event.id}/>
                })
            }
        </motion.div>
    )

}
