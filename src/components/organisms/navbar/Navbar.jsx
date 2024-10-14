import { useState, useEffect, useCallback } from "react";
import Nav from "./Nav";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/buttons/Button";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ heroHeight, notHome = false }) {
  const [offcanvas, setOffcanvas] = useState(false);
  const [black, setBlack] = useState(false);
  const [y, setY] = useState(0);

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        document.getElementById("navbar").style.top = "0";
        document.getElementById("navbar").style.opacity = "100";
      } else if (y < window.scrollY) {
        document.getElementById("navbar").style.top = "-65px";
        document.getElementById("navbar").style.opacity = "0";
      }

      setY(window.scrollY);
    },
    [y]
  );

  const changeNavbar = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (window.scrollY > heroHeight - 30) {
        setBlack(true);
      } else {
        setBlack(false);
      }
    },
    [heroHeight]
  );

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);
    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  }, [changeNavbar]);

  useEffect(() => {
    setY(window.scrollY);

    window.addEventListener("scroll", handleNavigation);
    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  const variants = {
    initial: {
      y: 470,
    },
    animate: {
      y: 0,
    },
    transition: {
      delay: 1,
      duration: 3,
      type: "tween",
      ease: "anticipate",
    },
  };

  return (
    <>
      <div
        id="navbar"
        className={classNames(
          "transition-all duration-500 ease-in-out fixed top-0 left-0 right-0 h-7 w-screen pl-7 sm:px-10 py-8 flex items-center z-10",
          black || notHome ? "bg-[#2d253a]" : "bg-transparent"
        )}
      >
        <div className="w-10/12 md:w-5/12 lg:w-3/12">
          <div className="uppercase text-xl sm:text-2xl font-semibold tracking-widest text-white">Logo</div>
        </div>
        <motion.div
          initial={{ y: 470 }}
          animate={{ y: 0 }}
          transition={{
            delay: 1,
            duration: 2,
            type: "tween",
            ease: "anticipate",
          }}
          className="w-6/12 hidden md:block"
        >
          <Nav dir="horizontal" scheme="light" />
        </motion.div>
        <div className="w-3/12 text-right hidden lg:block">
          <Button href="contact" pill variant="outline-yellow">
            contact
          </Button>
        </div>
        <motion.img
          src="/images/stack/menu.svg"
          className="w-1/12 md:hidden text-right"
          onClick={() => setOffcanvas(true)}
        />
      </div>

      <div
        className={classNames(
          "fixed bg-white bg-opacity-75 z-10 top-0 h-full w-full p-10 md:hidden transition-all",
          offcanvas ? "right-0" : "-right-full"
        )}
      >
        <Image
          alt="close button"
          src="/images/stack/x.svg"
          // layout="fill"
          width={24}
          height={24}
          onClick={() => setOffcanvas(false)}
        />
        <Nav scheme="dark" dir="vertical" />
      </div>
    </>
  );
}
// git push https://<GITHUB_ACCESS_TOKEN>@github.com/<GITHUB_USERNAME>/<REPOSITORY_NAME>.git
