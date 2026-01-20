import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Loader from "../../Loader";

const News = ({ countryCode }) => {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("us");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    // Build query params
    let url = `https://advanced-edu-backend.vercel.app/news?`;
    if (country) url += `country=${country}&`;
    if (category) url += `category=${category}&`;
    if (language) url += `language=${language}&`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setData([]);
        setLoading(false);
      });
  }, [country, category, language]);

  const selectCountry = (countryCode) => {
    setCountry(countryCode);
  };

  return (
    <div className="text-center m-10">
      {/* Filters */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        <details className="dropdown">
          <summary className="btn btn-primary">Select Country</summary>
          <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow max-h-96 overflow-y-auto flex-nowrap">
            {countryCode.map((btns, index) => (
              <li key={index}>
                <a onClick={() => selectCountry(btns.code)}>{btns.name}</a>
              </li>
            ))}
          </ul>
        </details>

        <select
          className="select select-primary"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="politics">Politics</option>
        </select>

        <select
          className="select select-primary"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">All Languages</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
        </select>
      </div>

      {loading && <Loader />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data && data.length > 0
          ? data.map((news, index) => (
              <div
                key={news.article_id || index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image Section */}
                <figure className="relative h-48 overflow-hidden">
                  <img
                    src={
                      news.image_url ||
                      "https://via.placeholder.com/400x300?text=No+Image"
                    }
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Category Badge on Image */}
                  {news.category && news.category.length > 0 && (
                    <div className="absolute top-3 right-3">
                      <span className="badge badge-primary badge-lg capitalize">
                        {news.category[0]}
                      </span>
                    </div>
                  )}
                </figure>

                {/* Card Body */}
                <div className="card-body p-5">
                  {/* Title */}
                  <h2 className="card-title text-lg font-bold line-clamp-2 text-left">
                    {news.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-3 text-left mt-2">
                    {news.description || "No description available"}
                  </p>

                  {/* Source & Date */}
                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                    {news.source_icon && (
                      <img
                        src={news.source_icon}
                        alt={news.source_name}
                        className="w-5 h-5 rounded-full"
                      />
                    )}
                    <span className="font-semibold">{news.source_name}</span>
                    <span>•</span>
                    <span>
                      {news.pubDate
                        ? new Date(news.pubDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  {/* Keywords */}
                  {news.keywords && news.keywords.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-3">
                      {news.keywords.slice(0, 3).map((keyword, i) => (
                        <span key={i} className="badge badge-outline badge-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="card-actions justify-end mt-4">
                    <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Read Full Article →
                    </a>
                  </div>
                </div>
              </div>
            ))
          : !loading && (
              <div className="col-span-full text-center py-20">
                <p className="text-xl text-gray-500">
                  No news available. Try different filters.
                </p>
              </div>
            )}
      </div>
    </div>
  );
};

export default News;
