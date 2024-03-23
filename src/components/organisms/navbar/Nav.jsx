import NavItem from "./NavItem";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav({ scheme, dir }) {
  const dirs = {
    horizontal: "justify-center space-x-10",
    vertical: "flex-col space-y-6",
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 100,
      transition: {
        staggerChildren: 0.13,
      },
    },
  };

  const item = {
    hidden: { y: "-100vh" },
    show: {
      y: 0,
      transition: {
        duration: 2,
        type: "spring",
        stifness: 300,
      },
    },
  };

  const pickedDir = dirs[dir];

  const size = useWindowSize();

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }

  return (
    <motion.ul variants={container} initial="hidden" animate="show" className={classNames("flex", pickedDir)}>
      <motion.div
        variants={item}
        // transition={{ delay: 2, duration: 1 }}
      >
        <NavItem scheme={scheme} href="/">
          Beranda
        </NavItem>
      </motion.div>
      <motion.div
        variants={item}
        // transition={{ delay: 2, duration: 1 }}
      >
        <NavItem scheme={scheme} href="skills">
          Skills
        </NavItem>
      </motion.div>
      <motion.div
        variants={item}
        // transition={{ delay: 2, duration: 1 }}
      >
        <NavItem scheme={scheme} href="projects">
          Projects
        </NavItem>
      </motion.div>
      {size.width <= 768 && (
        <motion.div
          variants={item}
          // transition={{ delay: 2, duration: 1 }}
        >
          <NavItem scheme={scheme} href="contact">
            contact
          </NavItem>
        </motion.div>
      )}
    </motion.ul>
  );
}
