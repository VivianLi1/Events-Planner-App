import { motion } from "framer-motion";
import {pageVariants, pageTransition} from '../FramerAnimations';


export default function AboutPage(){

    return(
        <motion.div
			initial="initial"
			animate="in"
			exit="out"
			variants={pageVariants}
			transition={pageTransition}
			className="AboutPage"
		>
			<diV className="AboutDiv">
				<h1>hey!</h1>
				<p>Thanks for checking out amusely :) This site is powered by the Ticketmaster API. </p>
				<p>My name is Vivian and I made this site. Check out the Github repo!</p>
				<a href="https://github.com/VivianLi1/Events-Planner-App" className="AboutIcon" rel="noreferrer" target="_blank"><i className="fab fa-github-square"></i></a>
				<a href="https://www.linkedin.com/in/vivian-li-39188b171/" className="AboutIcon" rel="noreferrer" target="_blank"><i className="fab fa-linkedin"></i></a>
			</diV>
        </motion.div>
    )
}