//how react render the html element
function customRender(reactElement,container){
    ////for limited attribute 
    // const domElement = document.createElement(reactElement.type);    //creating the dom element 
    // domElement.innerHTML = reactElement.children //setting its inner txt
    // domElement.setAttribute("href",reactElement.props.href)  //setting its attribute
    // domElement.setAttribute('target',reactElement.props.target)  //setting its attribute
    // container.appendChild(domElement)    //appending it to the root dom

    ////for n no. of attribute
    const domElement = document.createElement(reactElement.type);   //creating the dom element
    domElement.innerHTML = reactElement.children    //setting its inner txt
    for(const prop in reactElement.props){  //setting its attribute
        domElement.setAttribute(prop,reactElement.props[prop])
    }
    container.appendChild(domElement)   //appending it to the root dom
}




//creating the html element using js
const reactElement ={
    type: 'a',//tag you wanna create
    props:  { //attributes inside the tag
        href: 'htpps://google.com',
        target:'_blank'
    },
    children: 'anchor using js '    //thing that tag will contain
}

let root = document.querySelector("#root")

customRender(reactElement,root) //render the reactElement inside the root div