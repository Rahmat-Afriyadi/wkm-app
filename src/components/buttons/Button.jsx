function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Button({ href, className, variant, children, pill }) {
  const variants = {
    "outline-yellow": `border border-yellow-500 text-yellow-500 hover:text-black hover:bg-yellow-500`,
    yellow: "bg-yellow-500 hover:bg-yellow-600 text-black",
    black: "bg-black hover:bg-opacity-90 text-white",
  };

  const pickedVariant = variants[variant];

  return (
    <a
      href={href}
      className={classNames(
        "transition py-3 px-10 cursor-pointer font-semibold text-sm inline-block bg-green-400",
        pill && "rounded-full",
        pickedVariant,
        className
      )}
    >
      {children}
    </a>
  );
}
