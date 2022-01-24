import { motion } from "framer-motion";
import {pageVariants} from '../FramerAnimations';


export default function AboutPage(){

    return(
        <motion.div
			initial="initial"
			animate="in"
			exit="out"
			variants={pageVariants}
		>
        
        </motion.div>
    )
}