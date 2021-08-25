import React,{useEffect,useState} from 'react'
function TopFive() {
    const [topfive,setTopFive]=useState([])
    useEffect(()=>{
        fetch(`http://localhost:3002/getTopFive`)
          .then(r => r.json())
          .then(data => {

              setTopFive([...data.data])
          }); 
    
    })
    return (
        <div>
            <h1>Top 5 sale</h1>
            <div className="topFive__container">
            {
                topfive.map(elm=>{
                    return (
                        <div>
                        <h5>{elm.title} {elm.amount}</h5> 
                        </div>
                    )
})
            }
            </div>
        </div>
    )
}

export default TopFive
