import {Link,NavLink} from "react-router-dom"
function Head(){
    return(
       <>
            <ul>
                <li>
                    <Link to="/">link</Link>
                </li>
                <li>
                    <Link to="/about">about</Link>
                </li>
                <li>
                    <Link to="/contact"> contact</Link>
                </li>
            </ul>
       </>
    )
}
export default Head