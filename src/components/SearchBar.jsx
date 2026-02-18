import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function SearchBar({ searchcity }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm();

  const [suggestions, setSuggestions] = useState([]);
  const cityInput = watch("cityname");

  const apikey = "8aaa44881ed73f15decac6513472a44a";

  const onformsubmit = (obj) => {
    searchcity(obj.cityname);
    setSuggestions([]);
    reset();
  };

 
  useEffect(() => {
    if (!cityInput || cityInput.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${apikey}`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (err) {
        console.log("Suggestion error");
      }
    };

    const debounce = setTimeout(fetchSuggestions, 400);

    return () => clearTimeout(debounce);
  }, [cityInput]);

  const handleSelect = (cityObj) => {
    const fullCity = `${cityObj.name},${cityObj.country}`;
    setValue("cityname", fullCity);
    setSuggestions([]);
    searchcity(fullCity);
    reset()
  };

  return (
   <div className="search-container">
    <form onSubmit={handleSubmit(onformsubmit)}>

      <div className="input-wrapper">

        <div className="searchbox">
          <input
            className="inp"
            type="text"
            placeholder="Enter City..."
            {...register("cityname", { required: true })}
          />

          <button type="submit" className="btn btn-success">
            🔍
          </button>
        </div>

        {errors.cityname && (
          <p className="err">City name required</p>
        )}

        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((city, index) => (
              <li key={index} onClick={() => handleSelect(city)}>
                {city.name}, {city.state ? city.state + "," : ""} {city.country}
              </li>
            ))}
          </ul>
        )}

      </div>

    </form>
  </div>
  );
}

export default SearchBar;
