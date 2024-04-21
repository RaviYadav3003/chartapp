// import React, { useState } from "react";
// import { useDataContext } from "../Context/DataContext";

// export const Filter = () => {
//   const [selectedAge, setSelectedAge] = useState("");
//   const [selectedGender, setSelectedGender] = useState("");
//   const { setFiltersData, convertedData } = useDataContext();
//   const filterByAge = (age) => {
//     if (!age == "") {
//       const filtered = convertedData.filter((obj) => obj.Age === age);
//       console.log(filtered, "Age Filter");
//       setFiltersData(filtered);
//     } else {
//       setFiltersData(convertedData);
//     }
//   };
//   const filterByGender = (gender) => {
//     if (!gender == "") {
//       const filteredGender = convertedData.filter(
//         (obj) => obj.Gender === gender
//       );
//       setFiltersData(filteredGender);
//     } else {
//       setFiltersData(convertedData);
//     }
//   };

//   const handleSelectChange = (e) => {
//     setSelectedAge(e.target.value);
//     filterByAge(e.target.value);
//   };

//   const handleGenderSelectChange = (e) => {
//     setSelectedGender(e.target.value);
//     filterByGender(e.target.value);
//   };
//   return (
//     <div>
//       <label>
//         Age
//         <select
//           id="ageFilter"
//           value={selectedAge}
//           onChange={handleSelectChange}
//         >
//           <option value="">All Ages</option>
//           <option value=">25">Age &gt; 25</option>
//           <option value="15-25">Age 15-25</option>
//         </select>
//       </label>
//       <label htmlFor="genderFilter">Select Gender:</label>
//       <select
//         id="genderFilter"
//         value={selectedGender}
//         onChange={handleGenderSelectChange}
//       >
//         <option value="">All Genders</option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//       </select>
//     </div>
//   );
// };
////////////////


import React, { useState, useEffect } from "react";
import { useDataContext } from "../Context/DataContext";
import "./filter.css"
export const Filter = () => {

  const { setFiltersData, convertedData, selectedGender, setSelectedGender,
    selectedAge, setSelectedAge } = useDataContext();

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

  const filterByAge = (age) => {
    if (age !== "") {
      const filtered = convertedData?.filter((obj) => obj.Age === age);
      setFiltersData(filtered);
    } else {
      setFiltersData(convertedData);

    }
    // Save selected age to cookie
    setCookie("selectedAge", age);
  };

  const filterByGender = (gender) => {
    if (gender !== "") {
      const filteredGender = convertedData.filter(
        (obj) => obj.Gender === gender
      );
      setFiltersData(filteredGender);
    } else {
      setFiltersData(convertedData);
    }
    // Save selected gender to cookie
    setCookie("selectedGender", gender);
  };

  useEffect(() => {
    // Retrieve selected age and gender from cookies
    const savedSelectedAge = getCookie("selectedAge");
    const savedSelectedGender = getCookie("selectedGender");
    setSelectedAge(savedSelectedAge || "");
    setSelectedGender(savedSelectedGender || "");
    // Filter data based on saved selections
    filterByAge(savedSelectedAge);
    filterByGender(savedSelectedGender);
  }, []);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    if (name === "age") {
      setSelectedAge(value);
      filterByAge(value);
    } else if (name === "gender") {
      setSelectedGender(value);
      filterByGender(value);
    }
  };

  return (
    <div className="filterContainer">
      <label className="age" htmlFor="ageFilter">
        Age:
        <select
          name="age"
          value={selectedAge}
          onChange={handleSelectChange}
        >
          <option value="">All Ages</option>
          <option value=">25">Age &gt; 25</option>
          <option value="15-25">Age 15-25</option>
        </select>
      </label>
      <label className="gender" htmlFor="genderFilter">Select Gender:
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
