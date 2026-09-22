import AllUsers from "@/app/(components)/AllUsers"
import Profile from "@/app/(components)/Profile"
import { Mea_Culpa } from "next/font/google"
const meaCulpa = Mea_Culpa({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mea-culpa",
})
function Homepage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white border p-10 flex flex-col gap-3">
     <div className="w-full h-10 flex  justify-center items-center font-bold text-5xl ">
       <h1 className={meaCulpa.className}>InstaUsers</h1>

     </div>
     <div className="h-1  w-full bg-white "></div>
<Profile/>
<AllUsers/>
    </div>
  )
}

export default Homepage