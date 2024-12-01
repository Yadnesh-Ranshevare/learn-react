import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "./home";
//import First from "./firstyear";
import Firstyear from "./firstyear";
import Theme from "./theme";
import It from "./IT";
import Sem from "./sem";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/"  element={<Theme/>}>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/fy" element={<Firstyear/>}> </Route>
            <Route path="/it" element={<It/>}> </Route>
            <Route path="/sem" element={<Sem/>}> </Route>
        </Route>
    )
)
export default function Routes(){
    return(
        <>
            <RouterProvider router={ router}/>
        </>
    )
}