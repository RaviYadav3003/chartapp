import React, { createContext, useContext, useEffect, useState } from "react";
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


const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("CurrentUser") !== null);
    const [convertedData, setConvertedData] = useState([]);
    const [highValue, setHighValue] = useState([]);
    const [isFilterData, setIsFilterData] = useState(false);
    const [filtersData, setFiltersData] = useState(() => {
        const savedFiltersData = JSON.parse(getCookie("filtersData"));
        return savedFiltersData || [];
    });
    const [clickedData, setClickedData] = useState();
    const [data, setData] = useState([]);
    const [selectedAge, setSelectedAge] = useState("");
    const [selectedGender, setSelectedGender] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setCookie("filtersData", JSON.stringify(filtersData), 30);
    }, [filtersData]);

    const fetchData = async () => {
        try {
            const response = await fetch("https://chartappbackend.vercel.app/data");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const jsonData = await response.json();
            // if (jsonData.length > 0) {
            const savedFiltersData = JSON.parse(getCookie("filtersData")) || jsonData;
            setFiltersData(savedFiltersData);
            setConvertedData(jsonData);
            setData(jsonData);
            // }
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

        const highestValues = Object.entries(totalTimes).map(([feature, value]) => ({
            feature,
            value,
        }));

        setHighValue(highestValues);
    }, [filtersData]);

    const featureKeys = highValue.map((data) => data?.feature);
    const highestTimeSpent = highValue.map((data) => data?.value);

    const userData = {
        labels: featureKeys,
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
                selectedGender,
                setSelectedGender,
                selectedAge,
                setSelectedAge,
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
