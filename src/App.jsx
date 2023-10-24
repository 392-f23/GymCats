import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import OnboardingPreferencePage from './pages/OnboardingPreferencePage'
import LoginPage from './pages/LoginPage'
import OnboardingPersonalPage from './screens/OnboardingPersonalPage'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import { ThemeProvider } from '@mui/material'
import { theme } from './Theme';

const privateRoutes = [
  { path: "/onboardingPersonal", component: () => <OnboardingPersonalPage /> },
  { path: "/onboardingPreference", component: () => <OnboardingPreferencePage /> },
  { path: "/home", component: () => <HomePage /> },
];

const publicRoutes = [{ path: "/login", component: () => <LoginPage /> }];

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* // need to handle routes once we add authentication*/}
          <Route
            path="*"
            element={
              <Navigate to="/login" />
            }
          />
          <Route
            path="/"
            element={
              <Navigate to="/login" />
            }
          />
          {publicRoutes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={
                <route.component />
              }
            />
          ))}
          {privateRoutes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={
                <route.component />
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
