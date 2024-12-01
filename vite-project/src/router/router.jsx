import { Outlet } from 'react-router-dom'
import Head from './head.jsx'
function Router(){
    return(
       <>
         <Head/>
         <Outlet/>
       </>
    )
}
export default Router