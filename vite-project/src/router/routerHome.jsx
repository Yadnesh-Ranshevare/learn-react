
import Router from './router.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider,Route } from 'react-router-dom'
import About from './about.jsx'
import Contact from './contact.jsx'
import Pgf from './pgf.jsx'

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Router/>,
//         children:[{
//             path:"/about",
//             element: <About/>
//         },{
//             path:"/contact",
//             element:<Contact/>  
//         },{
//             path:"/but4",
//             element:<Pgf but="yadnesh"/>    //different output same file
//         },{
//             path:"/but3",
//             element: <Pgf but="ranshevare"/>    //diff output same file
//         }]
//     }
// ])
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Router/>}>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
            <Route path="/but3" element={<Pgf but="huju"/>}></Route> //diff output same file
            <Route path="/but4" element={<Pgf but="yadnesh"/>}></Route> //diff output same file
        </Route>
    )
)
export default function RouterHOme(){
    return(
        <RouterProvider router={router}/>
    )
}