import React, { useState, useEffect } from "react";
import "./DateFilter.css"
import { useNavigate, useLocation } from "react-router-dom";
import { useDataContext } from "../Context/DataContext";

export const DateFilter = () => {
  const { setFiltersData, setIsFilterData, selectedGender, setSelectedGender,
    selectedAge, setSelectedAge, setConvertedData, data } = useDataContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Function to get cookie
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

  // Function to set cookie
  const setCookie = (name, value, days = 30) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  // Function to delete cookie
  const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const [start, setStart] = useState(() => {
    // Check if start date is stored in cookies, otherwise use default value
    const startDateFromCookie = getCookie("startDate");
    return startDateFromCookie ? new Date(startDateFromCookie) : new Date("2022-10-04");
  });

  const [end, setEnd] = useState(() => {
    // Check if end date is stored in cookies, otherwise use default value
    const endDateFromCookie = getCookie("endDate");
    return endDateFromCookie ? new Date(endDateFromCookie) : new Date("2022-10-31");
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const startDateParam = params.get("start");
    const endDateParam = params.get("end");
    if (startDateParam && endDateParam) {
      setStart(new Date(startDateParam));
      setEnd(new Date(endDateParam));
      filterDate(new Date(startDateParam), new Date(endDateParam));
    }
  }, [location.search]);

  const filterDate = (startDate, endDate) => {
    const filteredData = data?.filter((obj) => {
      const day = new Date(obj.Day);
      return day >= startDate && day <= endDate;
    });

    setIsFilterData(true);
    setFiltersData(filteredData);
    setConvertedData(filteredData)

    setCookie("filtersData", JSON.stringify(filteredData));
    // Save start and end dates to cookies
    setCookie("startDate", startDate.toISOString());
    setCookie("endDate", endDate.toISOString());
  };

  const handleStartDateChange = (e) => {
    const newStartDate = new Date(e.target.value);
    setStart(newStartDate);
    filterDate(newStartDate, end); // Filter data whenever start date changes
  };

  const handleEndDateChange = (e) => {
    const newEndDate = new Date(e.target.value);
    setEnd(newEndDate);
    filterDate(start, newEndDate); // Filter data whenever end date changes
  };

  const generateShareURL = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("start", start.toISOString().split("T")[0]);
    queryParams.set("end", end.toISOString().split("T")[0]);
    const shareURL = `${window.location.origin}${window.location.pathname}?${queryParams.toString()}`;
    navigator.clipboard.writeText(shareURL);
    alert("URL copied to clipboard!");
  };

  const resetPreferences = () => {
    // Clear cookies for start and end dates
    deleteCookie("startDate");
    deleteCookie("endDate");
    deleteCookie("selectedGender");
    deleteCookie("selectedAge");

    // Reset state to default values
    setStart(new Date("2022-10-04"));
    setEnd(new Date("2022-10-31"));
    setSelectedAge("")
    setSelectedGender("")
    // Filter data with default dates
    filterDate(new Date("2022-10-04"), new Date("2022-10-31"));
  };

  return (
    <div className="dateFilterContainer">
      <label className="startDate" htmlFor="start">Start: <input
        type="date"
        min="2022-10-04"
        max="2022-10-30"
        name="start"
        id="start"
        value={start.toISOString().split("T")[0]}
        onChange={handleStartDateChange}
      /></label>

      <label className="endDate" htmlFor="end">End: <input
        type="date"
        min="2022-10-05"
        max="2022-10-30"
        name="End"
        id="End"
        value={end.toISOString().split("T")[0]}
        onChange={handleEndDateChange}
      /></label>

      {/* <button onClick={() => filterDate(start, end)}>Filter</button> */}
      <button className="shareUrl" onClick={generateShareURL}>Share URL</button>
      <button className="ResetButton" onClick={resetPreferences}>Reset Preferences</button>
    </div>
  );
};
