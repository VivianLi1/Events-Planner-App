import { motion } from "framer-motion";
import {pageVariants} from '../FramerAnimations';

import Event from "./Event";

export default function HomePage({handleSearch, getNextEvent, currEvent}) {
    
	return (
		<motion.div
			initial="initial"
			animate="in"
			exit="out"
			variants={pageVariants}
		>
			<button onClick={() => handleSearch()}>Get Event</button>
			{currEvent && <Event eventObj={currEvent} getNextEvent={getNextEvent}/>}
		</motion.div>
	);
}
