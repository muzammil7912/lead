import React, { useEffect } from 'react'
import { Routes,Route, useNavigate }  from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import config from "./services/config.json";
import './App.css';
import 'react-calendar/dist/Calendar.css';
import Dashboard from './Dashboard';
import LogIn from './Authentication/LogIn';
import MainHeadingProvider from './context/MainHeadingContext';
import MainTranslationProvider from './context/MainTranslationContext';
import MainCalendarListProvider from './context/MainCalendarListContext';
import MainProjectListProvider from './context/MainProjectListContext';
import MainActionListProvider from './context/MainActionListContext';
import MainFollowupListProvider from './context/MainFollowupListContext';
import MainMeetingListProvider from './context/MainMeetingListContext';
import MainOpportunitiesListProvider from './context/MainOpportunitiesListContext';
import MainTranslationsProvider from './context/MainTranslationContexts';
import Demo from './components/form/Demo';
import { getTokenSession } from './utils/common';
import MainAuthPermissionsProvider from './context/MainAuthPermissionsContext';
import MainLeadPermissionProvider from './context/MainLeadPermissionContext';
import MainEditCalenderProvider from './context/MainEditCalenderContext';
import AppoinmentCalender from './AppoinmentCalender';
import { Signature } from './Signature';
import { ConvertAssignProvider } from './context/convertAssignContext';
import { ConvertAssignProspectProvider } from './context/convertAssignContextProspect';
import MaintSettingsByUserProvider from './context/MaintSettingsByUserContext';
import { HelmetProvider } from 'react-helmet-async';
import MainModuleContextProvider from './context/MainModuleContext';
import MainExportDataContextProvider from './context/MainExportDataContext';
import MainComponent from './MainComponent';
import Privacy from './Privacy/Privacy';
import Conditions from './Condition/Conditions';
import MainStatisticsContext from './context/MainStatisticsContext';
import  MainCalenderIdContext  from './context/MainCalenderIdContext';

function App() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   !getTokenSession() && navigate(`/${config.ddemoss}login`);
  // }, []);
  return (
    <>
    <MainStatisticsContext>
      
    <HelmetProvider>
      <MainCalenderIdContext>
    <MainExportDataContextProvider>
    <MainModuleContextProvider>
    <MaintSettingsByUserProvider>
    <ConvertAssignProspectProvider>
    <ConvertAssignProvider>
     <MainEditCalenderProvider>
     <MainLeadPermissionProvider>
     <MainAuthPermissionsProvider>
     <MainTranslationsProvider>
     <MainOpportunitiesListProvider>
     <MainCalendarListProvider>
     <MainActionListProvider>
     <MainProjectListProvider>
     <MainFollowupListProvider>
     <MainMeetingListProvider>
     <MainTranslationProvider>
     <MainHeadingProvider>
    <Routes>
          <Route path={`/${config.ddemoss}login`} element={<LogIn />} />
          <Route path={`/${config.ddemoss}*`} element={<Dashboard />} />
          <Route path={`/${config.ddemoss}appointment/:name`} element={<AppoinmentCalender />} />
          <Route path={`/a`} element={<MainComponent />} />
          <Route path={`/${config.ddemoss}privacy`} element={<Privacy />} />
              <Route path={`/${config.ddemoss}terms`} element={<Conditions />} />
          <Route path={`/${config.ddemoss}signature/:id`} element={<Signature />} />
    </Routes>
    <ToastContainer />
    </MainHeadingProvider>
    </MainTranslationProvider>
    </MainMeetingListProvider>
    </MainFollowupListProvider> 
    </MainProjectListProvider>
    </MainActionListProvider>
    </MainCalendarListProvider>
    </MainOpportunitiesListProvider>
    </MainTranslationsProvider>
    </MainAuthPermissionsProvider>
    </MainLeadPermissionProvider>
    </MainEditCalenderProvider>
    </ConvertAssignProvider>
    </ConvertAssignProspectProvider>
    </MaintSettingsByUserProvider>
    </MainModuleContextProvider>
    </MainExportDataContextProvider>
    </MainCalenderIdContext>
    </HelmetProvider>
    </MainStatisticsContext>
    </>
  );
}

export default App;
