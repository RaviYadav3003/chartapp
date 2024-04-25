import React, {  useEffect } from "react";
import { useDataContext } from "../Context/DataContext";
import "./filter.css";

export const Filter = () => {
  const {
    setFiltersData,
    convertedData,
    selectedGender,
    setSelectedGender,
    selectedAge,
    setSelectedAge,
  } = useDataContext();

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  };

  const setCookie = (name, value, days = 30) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const filterData = () => {
    let filteredData = convertedData;

    if (selectedAge !== "") {
      filteredData = filteredData.filter((obj) => obj.Age === selectedAge);
    }

    if (selectedGender !== "") {
      filteredData = filteredData.filter(
        (obj) => obj.Gender === selectedGender
      );
    }

    setFiltersData(filteredData);
  };

  useEffect(() => {
    const savedSelectedAge = getCookie("selectedAge");
    const savedSelectedGender = getCookie("selectedGender");
    setSelectedAge(savedSelectedAge || "");
    setSelectedGender(savedSelectedGender || "");
    filterData();
  }, []);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "age") {
      setSelectedAge(value);
      setCookie("selectedAge", value);
    } else if (name === "gender") {
      setSelectedGender(value);
      setCookie("selectedGender", value);
    }
  };

  useEffect(() => {
    filterData();
  }, [selectedAge, selectedGender]);

  return (
    <div className="filterContainer">
      <label className="age" htmlFor="ageFilter">
        Age:
        <select name="age" value={selectedAge} onChange={handleSelectChange}>
          <option value="">All Ages</option>
          <option value=">25">Age &gt; 25</option>
          <option value="15-25">Age 15-25</option>
        </select>
      </label>
      <label className="gender" htmlFor="genderFilter">
        Select Gender:
        <select
          name="gender"
          value={selectedGender}
          onChange={handleSelectChange}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
    </div>
  );
};
