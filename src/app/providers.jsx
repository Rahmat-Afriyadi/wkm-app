
"use client";


import { SessionProvider } from "next-auth/react";
import AutoLogoutProvider from "../components/providers/auto-logout-provider"


export default function Providers({ children }) {
    return (
            <SessionProvider>
              {/* <AutoLogoutProvider/> */}
                {children}
            </SessionProvider>
    );
}
