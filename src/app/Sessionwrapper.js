"use client"

import { SessionProvider } from "next-auth/react";
function Sessionwrapper ({children}) {
  return (
 <SessionProvider>{children}</SessionProvider>
  )
}

export default Sessionwrapper