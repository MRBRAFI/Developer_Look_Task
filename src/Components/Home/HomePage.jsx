import React from "react";
import NewsTitle from "./NewsTitle/NewsTitle";
import News from "./News/News";
import { useLoaderData } from "react-router";

const HomePage = () => {
  const countryCode = useLoaderData();
  console.log(countryCode);

  return (
    <div>
      <NewsTitle></NewsTitle>
      <News countryCode={countryCode}></News>
    </div>
  );
};

export default HomePage;
