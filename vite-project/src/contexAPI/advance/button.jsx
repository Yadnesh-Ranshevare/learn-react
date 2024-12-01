import useNewContext from "./contex"

export default function But(){
    
    const {themeMode,lightTheme,darkTheme}=useNewContext()
    function setTheme(){
        if(themeMode == "light"){
            darkTheme()
        }else{
            lightTheme()
        }
    } 
    return(
        <>
            <button onClick={setTheme}>change theme</button>
        </>
    )
}