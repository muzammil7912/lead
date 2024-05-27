import React,{useState} from "react";

export const MainStatisticsContextProvider = React.createContext();
function MainStatisticsContext({ children }) {
  const [statisticsData, setstatisticsData] = useState("statas");

  const updateStatisticsData = (data) => {
    setstatisticsData(data);
  };

  return (
    <MainStatisticsContextProvider.Provider value={{ statisticsData, updateStatisticsData }}>
      {children}
    </MainStatisticsContextProvider.Provider>
  );
}

export default MainStatisticsContext;
