
    import React from 'react'
    import TopFive from "./TopFive"
    import GetTopFiveUniqe from "./TopFiveUniqe"
    import GetTopFiveDays from "./TopFiveDay"
    import "./Stats.css"

    function Stats() {
        return (
            <div className="topfive_container">
                    <TopFive className="space" />
                    <GetTopFiveUniqe className="space"/>
                    <GetTopFiveDays className="space"/>
            </div>
        )
    }
    
    export default Stats
    