import React, { useEffect, useState } from "react";

function GetTopFiveUniqe() {
    const [topfive, setTopFive] = useState([]);

    useEffect(() => {
      const interval = setInterval(() => {
        fetch(`http://localhost:3002/getTopFiveUniqeServer`)
        .then((r) => r.json())
        .then((data) => {
          setTopFive([...data.data]);
        });
      }, 1000);
      return () => clearInterval(interval);
  },[]);
  return (
    <div>
      <h1>Top 5 sale uniqe</h1>
      <div className="topFive__container">
        {topfive.map((elm) => {
          return (
            <div>
              <h5>
               {elm.title}  {elm.sale_count}
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GetTopFiveUniqe;
