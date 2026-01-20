import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const News = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://newsdata.io/api/1/latest? 
  apikey=pub_269486bf1c464747bb9ee8a5e9f80ce9`)
      .then((response) => response.json())
      .then((data) => setData(data.results))
      .catch((error) => console.error("Error:", error));
  }, []);

  console.log(data);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center">
        {data.map((btns) => (
          <button className="text-xl mx-3 bg-primary text-white p-2 rounded-xl hover:cursor-pointer">
            {btns.country}
          </button>
        ))}
      </div>
      <div>
        {data.map((news) => (
          <p>{news.category[0]}</p>
        ))}
      </div>
    </div>
  );
};

export default News;
