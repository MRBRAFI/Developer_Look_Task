import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loader from "../../Loader";

const News = ({ countryCode }) => {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("us");

  useEffect(() => {
    fetch(`https://newsdata.io/api/1/latest? 
  apikey=pub_269486bf1c464747bb9ee8a5e9f80ce9&country=${country}`)
      .then((response) => response.json())
      .then((data) => setData(data.results))
      .catch((error) => console.error("Error:", error));
  }, [country]);

  const selectCountry = (data) => {
    setCountry(data);
  };
  console.log(data);
  console.log(country);

  return (
    <div className="text-center m-10">
      <details className="dropdown">
        <summary className="btn btn-primary">Search</summary>
        <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow max-h-96 overflow-y-auto flex-nowrap">
          {countryCode.map((btns, index) => (
            <li key={index}>
              <a onClick={() => selectCountry(btns.code)}>{btns.name}</a>
            </li>
          ))}
        </ul>
      </details>
      <div className="grid grid-cols-4 my-20 gap-20">
        {data.map((news, index) => (
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure className="px-10 pt-10 h-80">
              <span className="badge bg-primary text-white absolute top-10 left-10">
                {news.category[0]}
              </span>
              <img src={news.image_url} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{news.country}</h2>
              <p className="h-52 overflow-auto">{news.description}</p>
              <div className="card-actions">
                <Link to={news.source_url} className="btn btn-primary">
                  See the news
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
