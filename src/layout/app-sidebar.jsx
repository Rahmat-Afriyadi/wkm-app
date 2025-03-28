"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSidebar } from "@/context/sidebar-context";
import { navigation, secondaryNavigation } from "./item";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeftStartOnRectangleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AppSidebar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  return (
    <aside
      className={`fixed mt-3 flex flex-col top-0 px-5 bg-white text-gray-900 h-screen transition-all z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"} 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* <div className="flex justify-center">
        <strong
          style={{ transition: "transform 0.5s ease-in-out" }}
          className={`text-2xl ${!isExpanded ? "-translate-x-16" : ""}`}
        >
          WKM
        </strong>
      </div> */}
      <div className={`py-8 flex  ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <strong>WKM</strong>
      </div>
      <nav className="mb-6 flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                if (session?.user?.permissions?.includes(item.name)) {
                  return (
                    <li
                      key={item.name}
                      className={classNames(
                        "h-10 overflow-hidden hover:h-auto cursor-pointer",
                        item.children?.filter((z) => z.to == pathName).length > 0 && isExpanded ? "h-auto" : ""
                      )}
                    >
                      <a
                        href={item.children ? undefined : item.to}
                        className={classNames(
                          item.to === pathName || item.children?.filter((z) => z.to == pathName).length > 0
                            ? "bg-black text-yellow"
                            : "text-cyan-200 hover:text-yellow hover:bg-black",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          style={{
                            transition: "transform 0.5s ease-in-out",
                          }}
                          className={classNames(
                            item.to === pathName ? "bg-black text-yellow" : "text-cyan-200 group-hover:text-yellow",
                            "h-6 w-6 shrink-0 mr-2",
                            !isExpanded ? "scale-125" : ""
                          )}
                          aria-hidden="true"
                        />
                        <span
                          style={{ transition: "transform 0.5s ease-in-out" }}
                          className={` whitespace-nowrap overflow-hidden ${
                            !isExpanded && !isHovered ? "translate-x-2 opacity-0" : ""
                          }`}
                        >
                          {item.name}
                        </span>
                        <span className=" right-5 absolute group-hover:rotate-180 group-hover:right-7 group-hover:mt-1">
                          {item.children && (
                            <ArrowDownIcon
                              style={{
                                transition: "transform 0.5s ease-in-out",
                              }}
                              className={classNames(
                                item.to === pathName ? "bg-black text-yellow" : "text-cyan-200 group-hover:text-yellow",
                                "h-4 w-4 shrink-0 mr-2 mt-1",
                                !isExpanded ? "scale-125" : ""
                              )}
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </a>
                      {item.children && (
                        <div className=" w-full flex flex-col items-end mt-1 bg-slate-100 rounded-md">
                          {item.children.map((itemA) => {
                            return (
                              <a
                                key={itemA.name}
                                href={itemA.to}
                                className={classNames(
                                  itemA.to === pathName
                                    ? "bg-black text-yellow"
                                    : "text-cyan-200 hover:text-yellow hover:bg-black",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-2/3"
                                )}
                              >
                                <itemA.icon
                                  style={{
                                    transition: "transform 0.5s ease-in-out",
                                  }}
                                  className={classNames(
                                    itemA.to === pathName
                                      ? "bg-black text-yellow"
                                      : "text-cyan-200 group-hover:text-yellow",
                                    "h-6 w-6 shrink-0 mr-2",
                                    !isExpanded ? "scale-125" : ""
                                  )}
                                  aria-hidden="true"
                                />
                                <span
                                  style={{ transition: "transform 0.5s ease-in-out" }}
                                  className={` whitespace-nowrap overflow-hidden ${
                                    !isExpanded && !isHovered ? "translate-x-2 opacity-0" : ""
                                  }`}
                                >
                                  {itemA.name}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            {/* <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                if (session?.user?.permissions?.includes(item.name)) {
                  return (
                    <li key={item.name}>
                      <a
                        href={item.to}
                        className={classNames(
                          item.to === pathName
                            ? "bg-black text-yellow"
                            : "text-cyan-200 hover:text-yellow hover:bg-black",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          style={{
                            transition: "transform 0.5s ease-in-out",
                          }}
                          className={classNames(
                            item.to === pathName ? "bg-black text-yellow" : "text-cyan-200 group-hover:text-yellow",
                            "h-6 w-6 shrink-0 mr-2",
                            !isExpanded ? "scale-125" : ""
                          )}
                          aria-hidden="true"
                        />
                        <span
                          style={{ transition: "transform 0.5s ease-in-out" }}
                          className={` whitespace-nowrap overflow-hidden ${
                            !isExpanded && !isHovered ? "translate-x-2 opacity-0" : ""
                          }`}
                        >
                          {item.name}
                        </span>
                      </a>
                    </li>
                  );
                }
                return null;
              })}
            </ul> */}
          </li>
          <li>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.to}
                    className={classNames(
                      item.to === pathName ? "bg-black text-yellow" : "text-cyan-200 hover:text-yellow hover:bg-black",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-500">
                      <item.icon
                        style={{
                          transition: "transform 0.5s ease-in-out",
                        }}
                        className={classNames(
                          item.to === pathName ? "bg-black text-yellow" : "text-cyan-200 group-hover:text-yellow",
                          "h-6 w-6 shrink-0",
                          !isExpanded ? "scale-125" : ""
                        )}
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      style={{ transition: "transform 0.5s ease-in-out" }}
                      className={` whitespace-nowrap overflow-hidden ${
                        !isExpanded && !isHovered ? "translate-x-2 opacity-0" : ""
                      }`}
                    >
                      {item.name}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  type="button"
                  onClick={() => {
                    signOut({ redirect: false }).then(() => {
                      void signIn();
                    });
                  }}
                  className="text-cyan-200 hover:text-yellow hover:bg-black group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-500">
                    <ArrowLeftStartOnRectangleIcon
                      style={{
                        transition: "transform 0.5s ease-in-out",
                      }}
                      className={`text-cyan-200 group-hover:text-yellow h-6 w-6 shrink-0 ${
                        !isExpanded ? "scale-125" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                  <span
                    style={{ transition: "transform 0.5s ease-in-out" }}
                    className={`whitespace-nowrap overflow-hidden ${
                      !isExpanded && !isHovered ? "translate-x-2 opacity-0" : ""
                    } `}
                  >
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
    </aside>
  );
};

export default AppSidebar;
