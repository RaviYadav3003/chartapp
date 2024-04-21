// import { createContext, useContext, useEffect, useState } from "react";
// // import { Data } from "../Data";

// const Context = createContext();
// export const ContextProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState();
//     const [data, setData] = useState([]);
//     const [convertedData, setConvertedData] = useState([]);
//     const [highValue, setHighValue] = useState([]);
//     const [filterData, setFilterData] = useState(false);
//     const [filtersData, setFiltersData] = useState(data);
//     const [clickedData, setClickedData] = useState();

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await fetch(
//                 "https://0229de22-5cce-46e7-a261-37e17e8a74b0-00-v37qlkg5l5zb.picard.replit.dev/data"
//             );
//             console.log(response, "response");
//             if (!response.status === 200) {
//                 throw new Error("Failed to fetch data");
//             }
//             const jsonData = await response.json();
//             setData(jsonData);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     useEffect(() => {
//         const ConvertedData = data?.map((data) => data);

//         setConvertedData(ConvertedData);

//         const totalTimes = {
//             A: 0,
//             B: 0,
//             C: 0,
//             D: 0,
//             E: 0,
//             F: 0,
//         };
//         filtersData?.forEach((item) => {
//             Object.keys(totalTimes).forEach((feature) => {
//                 totalTimes[feature] += parseInt(item.features[feature]);
//             });
//         });

//         Object.keys(totalTimes).forEach((feature) => {
//             totalTimes[feature] = Math.round(totalTimes[feature] / 60);
//         });

//         const highestValuesArray2 = Object.entries(totalTimes).map(
//             ([feature, value]) => ({
//                 feature,
//                 value,
//             })
//         );

//         setHighValue(highestValuesArray2);
//     }, [filtersData]);

//     const featureKey = highValue.map((data) => data.feature);

//     const highestTimeSpent = highValue.map((data) => data.value);
//     console.log(clickedData, "CLickedData");
//     const userData = {
//         labels: featureKey,
//         datasets: [
//             {
//                 label: "Total Time Spent (Hrs)",
//                 data: highestTimeSpent,
//             },
//         ],
//     };
//     const Date = filtersData?.map((data) => data.Day);
//     const lineChartData = {
//         labels: Date,
//         datasets: [
//             {
//                 label: "Feature Data",
//                 data: clickedData,
//             },
//         ],
//     };

//     return (
//         <Context.Provider
//             value={{
//                 isLoggedIn,
//                 setIsLoggedIn,
//                 highValue,
//                 userData,
//                 convertedData,
//                 filterData,
//                 filtersData,
//                 setFilterData,
//                 setFiltersData,
//                 setClickedData,
//                 lineChartData,
//             }}
//         >
//             {children}
//         </Context.Provider>
//     );
// };

// export const useDataContext = () => {
//     const context = useContext(Context);
//     if (!context) {
//         throw new Error("DataContext error occured");
//     }
//     return context;
// };

// import React, { createContext, useContext, useEffect, useState } from "react";
// import setCookie, { getCookie } from "../helpers/cookieHelper";

// const Context = createContext();

// export const ContextProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState();
//     const [convertedData, setConvertedData] = useState([]);
//     const [highValue, setHighValue] = useState([]);
//     const [isFilterData, setIsFilterData] = useState(false);
//     const [filtersData, setFiltersData] = useState([]);
//     const [clickedData, setClickedData] = useState();
//     const [data, setData] = useState([])
//     useEffect(() => {
//         fetchData();
//     }, []);

//     useEffect(() => {
//         // Save filtersData to cookies whenever it changes
//         setCookie("filtersData", filtersData);
//     }, [filtersData]);

//     const fetchData = async () => {
//         try {
//             const response = await fetch(
//                 "https://0229de22-5cce-46e7-a261-37e17e8a74b0-00-v37qlkg5l5zb.picard.replit.dev/data"
//             );
//             if (!response.ok) {
//                 throw new Error("Failed to fetch data");
//             }
//             const jsonData = await response.json();
//             // Retrieve filtersData from cookies if available, otherwise use default value (jsonData)
//             // const savedFiltersData = getCookie("filtersData");
//             setFiltersData(jsonData);
//             setConvertedData(jsonData);
//             setData(jsonData,)

//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     useEffect(() => {
//         const totalTimes = {
//             A: 0,
//             B: 0,
//             C: 0,
//             D: 0,
//             E: 0,
//             F: 0,
//         };
//         filtersData?.forEach((item) => {
//             Object.keys(totalTimes).forEach((feature) => {
//                 totalTimes[feature] += parseInt(item.features[feature]);
//             });
//         });

//         Object.keys(totalTimes).forEach((feature) => {
//             totalTimes[feature] = Math.round(totalTimes[feature] / 60);
//         });

//         const highestValuesArray = Object.entries(totalTimes).map(([feature, value]) => ({
//             feature,
//             value,
//         }));

//         setHighValue(highestValuesArray);
//     }, [filtersData]);

//     const featureKey = highValue.map((data) => data.feature);
//     const highestTimeSpent = highValue.map((data) => data.value);

//     const userData = {
//         labels: featureKey,
//         datasets: [
//             {
//                 label: "Total Time Spent (Hrs)",
//                 data: highestTimeSpent,
//             },
//         ],
//     };

//     const Date = filtersData?.map((data) => data.Day);
//     const lineChartData = {
//         labels: Date,
//         datasets: [
//             {
//                 label: "Feature Data",
//                 data: clickedData,
//             },
//         ],
//     };

//     // // Function to save data to cookies
//     // const saveToCookies = (name, value) => {
//     //     document.cookie = `${name}=${JSON.stringify(value)}; path=/; max-age=${60 * 60 * 24 * 30}`;
//     // };

//     // // Function to retrieve data from cookies
//     // const getFromCookies = (name) => {
//     //     const cookies = Object.fromEntries(document.cookie.split("; ").map((c) => c.split("=")));
//     //     const value = cookies[name];
//     //     if (value) {
//     //         try {
//     //             return JSON.parse(value);
//     //         } catch (error) {
//     //             console.error("Error parsing JSON from cookie:", error);
//     //             return null;
//     //         }
//     //     }
//     //     return null;
//     // };

//     return (
//         <Context.Provider
//             value={{
//                 isLoggedIn,
//                 setIsLoggedIn,
//                 highValue,
//                 userData,
//                 convertedData,
//                 isFilterData,
//                 filtersData,
//                 setIsFilterData,
//                 setFiltersData,
//                 setClickedData,
//                 lineChartData,
//                 setConvertedData,
//                 data
//             }}
//         >
//             {children}
//         </Context.Provider>
//     );
// };

// export const useDataContext = () => {
//     const context = useContext(Context);
//     if (!context) {
//         throw new Error("DataContext error occurred");
//     }
//     return context;
// };

import React, { createContext, useContext, useEffect, useState } from "react";

// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [convertedData, setConvertedData] = useState([]);
    const [highValue, setHighValue] = useState([]);
    const [isFilterData, setIsFilterData] = useState(false);
    const [filtersData, setFiltersData] = useState([]);
    const [clickedData, setClickedData] = useState();
    const [data, setData] = useState([]);
    const [selectedAge, setSelectedAge] = useState("");
    const [selectedGender, setSelectedGender] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Save filtersData to cookies whenever it changes
        // setCookie("filtersData", JSON.stringify(filtersData), 30); // Save data as JSON string and expires in 30 days

    }, [filtersData]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/data"
            );
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();
            // Retrieve filtersData from cookies if available, otherwise use default value (jsonData)
            const savedFiltersData = JSON.parse(getCookie("filtersData")) || jsonData;
            setFiltersData(savedFiltersData);
            setConvertedData(jsonData);
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const totalTimes = {
            A: 0,
            B: 0,
            C: 0,
            D: 0,
            E: 0,
            F: 0,
        };
        filtersData?.forEach((item) => {
            Object.keys(totalTimes).forEach((feature) => {
                totalTimes[feature] += parseInt(item.features[feature]);
            });
        });

        Object.keys(totalTimes).forEach((feature) => {
            totalTimes[feature] = Math.round(totalTimes[feature] / 60);
        });

        const highestValuesArray = Object.entries(totalTimes).map(([feature, value]) => ({
            feature,
            value,
        }));

        setHighValue(highestValuesArray);
    }, [filtersData]);

    const featureKey = highValue.map((data) => data.feature);
    const highestTimeSpent = highValue.map((data) => data.value);

    const userData = {
        labels: featureKey,
        datasets: [
            {
                label: "Total Time Spent (Hrs)",
                data: highestTimeSpent,
            },
        ],
    };

    const Date = filtersData?.map((data) => data.Day);
    const lineChartData = {
        labels: Date,
        datasets: [
            {
                label: "Feature Data",
                data: clickedData,
            },
        ],
    };

    return (
        <Context.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                highValue,
                userData,
                convertedData,
                isFilterData,
                filtersData,
                setIsFilterData,
                setFiltersData,
                setClickedData,
                lineChartData,
                setConvertedData,
                data,
                selectedGender, setSelectedGender,
                selectedAge, setSelectedAge
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("DataContext error occurred");
    }
    return context;
};
