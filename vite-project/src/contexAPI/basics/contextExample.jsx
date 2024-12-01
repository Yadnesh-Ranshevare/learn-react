import Getter from "./getter";
import Provide from "./provide";
import Setter from "./setter";

function ContextExample(){
    return(
       <>
            <Provide>
                <Setter/>
                <Getter/>
            </Provide>
       </>
    )
}
export default ContextExample