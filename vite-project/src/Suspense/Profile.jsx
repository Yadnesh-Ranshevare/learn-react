export default function Profile() {
    const list = [];
    for(let i = 0; i < 100; i++){
        list.push(i);
    }
  return (
    
    list.map((val,idx)=>(<div key={idx}>{val}</div>))
    
  )
}
