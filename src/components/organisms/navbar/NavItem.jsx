import { motion } from "framer-motion";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavItem({ href, scheme, children }) {
    const schemes = {
        light: "text-white text-opacity-60 hover:text-opacity-100",
        dark: "text-black"
    }

    var offset_value = 10
    if (href == 'contact') {
        offset_value = 0  
    }

   const pickedScheme = schemes[scheme];

    return (
      <motion.li
        whileHover={{ scale: 1.2, originX: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <a
        href={href}
          className={classNames(
            "text-lg transition font-semibold cursor-pointer",
            pickedScheme
          )}
        >
          {children}
        </a>
      </motion.li>
    );
}
