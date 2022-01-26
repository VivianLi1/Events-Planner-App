import { motion } from "framer-motion";
import {pageVariants, pageTransition} from '../FramerAnimations';

import Event from "./Event";
import SearchForm from "./SearchForm";


export default function HomePage({handleSearch, getNextEvent, eventStatus, currEvent, setCurrEvent}) {
    
	return (
		<motion.div
			initial="initial"
			animate="in"
			exit="out"
			variants={pageVariants}
			transition={pageTransition}
			className="HomePage"
		>
			{/* displays search form on first render or when category is clicked */}
			{!currEvent && <SearchForm handleSearch={handleSearch}/>}
			{eventStatus === "no events" ? 
				<div className="eventStatus NoEvents"><h2>no events found :(</h2></div> :
				eventStatus === "no more events" ? 
					<div className="eventStatus NoEvents"><h2>no more events :(</h2></div> :
					currEvent && (
						<div>
							<div className="Event--Category-Div">
								<div className="Event--Category">
									<h3>now showing</h3>
									<h1 onClick={() => setCurrEvent(false)} className="category">{eventStatus}</h1>
								</div>
							</div>
							<Event eventObj={currEvent} getNextEvent={getNextEvent}/>
						</div>
					)}
		</motion.div>
	);
}
