import React, { useState } from "react";
import { genres, countries } from "../filter";

const TrendingFilter = props => {
  let [chart, setChart] = useState("Top 50");
  let [country, setCountry] = useState("Canada");
  let [genre, setGenre] = useState("danceedm");

  const listCountries = () => {
    let list = [];
    countries.forEach(count => {
      if (country == count) {
        list.push(
          <option selected value={count}>
            {count}
          </option>
        );
      } else {
        list.push(<option value={count}>{count}</option>);
      }
    });
    return list;
  };

  const listGenres = () => {
    let list = [];
    genres.forEach(gen => {
      if (genre == gen.key) {
        list.push(
          <option selected value={gen.key}>
            {gen.value}
          </option>
        );
      } else {
        list.push(<option value={gen.key}>{gen.value}</option>);
      }
    });
    return list;
  };

  const _change = e => {
    console.log(e.target.value);
    switch (e.target.name) {
      case "chart":
        setChart(e.target.value);
        props.getTrending({
          kind: "top",
          genre: `soundcloud:genres:${genre}`,
          region: `soundcloud:regions:CA`,
          limit: "50"
        });
        break;
      case "country":
        setCountry(e.target.value);
        props.getTrending({
          kind: "top",
          genre: `soundcloud:genres:${genre}`,
          region: `soundcloud:regions:CA`,
          limit: "50"
        });
        break;
      case "genre":
        setGenre(e.target.value);
        props.getTrending({
          kind: "top",
          genre: `soundcloud:genres:${genre}`,
          region: `soundcloud:regions:CA`,
          limit: "50"
        });
        break;
    }
  };

  return (
    <div className="trending-filter-container">
      <select name="chart" onChange={_change} className="drop">
        <option selected value="Top 50">
          Top 50
        </option>
        <option value="New & Hot">New & Hot</option>
      </select>
      <select name="country" onChange={_change} className="drop">
        {listCountries()}
      </select>
      <select name="genre" onChange={_change} className="drop">
        {listGenres()}
      </select>
    </div>
  );
};

export default TrendingFilter;
