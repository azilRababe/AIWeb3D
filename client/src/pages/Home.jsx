import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import { state } from "../store";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import { CustomButton } from "../Components/CustomButton";

export const Home = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./Cat.png"
              alt="logo"
              className="w-10 h-10 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                ELEVATE
                <br className="xl:block hidden" /> YOUR STYLE.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Tired of generic t-shirts? Custom Tee Designer 3E is your
                solution for creating one-of-a-kind custom tees that reflect
                your style and creativity.{" "}
                <b>Stand out and wear your uniqueness proudly!</b>
              </p>

              <CustomButton
                type="filled"
                title="Customize It"
                handleClick={() => (state.intro = false)}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
