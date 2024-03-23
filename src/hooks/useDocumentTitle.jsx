"use client";

import { useEffect, useRef } from "react";

export default function useDocumentTitle(title, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   document.title = title;
    // }
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  }, [prevailOnUnmount]);
}
