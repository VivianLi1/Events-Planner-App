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
		>
        
        </motion.div>
    )
}