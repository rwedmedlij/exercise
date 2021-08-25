import React, { useEffect, useState } from "react";
function TopFiveDay() {
  const [topfive, setTopFive] = useState([]);
  var dateResult = new Date();

  useEffect(() => {
    fetch(`http://localhost:3002/topFiveLast5days`)
      .then((r) => r.json())
      .then((data) => {
        setTopFive([...data.data]);
        dateResult = new Date(data.saledAt);
      });
  });
  return (
    <div>
      <h1>Past 5 days</h1>
      <div className="topFive__container">
        {topfive.map((elm) => {
          {
            var d = new Date(elm.saledAt);
          }
          return (
            <div>
              <h5>
                {d.getDate()}.{d.getMonth()}.{d.getFullYear()} {elm.total}$
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopFiveDay;
