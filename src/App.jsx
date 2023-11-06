import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import FormPage from "./pages/FormPage";
import HomePage from "./pages/HomePage";
import RequestsPage from "./pages/RequestsPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import {
  checkIfLoggedIn,
  isOnboarded as checkIfOnboarded,
} from "./utility/firebase";
import LoadingContainer from "./components/LoadingContainer";
import "./App.css";
import ProfilePage from "./pages/ProfilePage";
import EditPersonalPage from "./pages/EditPersonalPage";
import EditPreferencePage from "./pages/EditPreferencePage";

const privateRoutes = [
  // { path: "/onboarding", component: () => <FormPage /> },
  { path: "/home", component: () => <HomePage /> },
  { path: "/requests", component: () => <RequestsPage /> },
  { path: "/profile", component: () => <ProfilePage /> },
  { path: "/profile/edit/personal", component: () => <EditPersonalPage /> },
  { path: "/profile/edit/preference", component: () => <EditPreferencePage /> },
];

const publicRoutes = [{ path: "/login", component: () => <LoginPage /> }];

function App() {
  const isSignedIn = checkIfLoggedIn();
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const onboarded = await checkIfOnboarded();
      setIsOnboarded(onboarded);
      setIsLoading(false);
    };

    init();
  }, []);

  return (
    <LoadingContainer isLoading={isLoading}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {isSignedIn && !isOnboarded && <Navigate to="/onboarding" />}
          <Routes>
            <Route
              path="*"
              element={
                isSignedIn ? (
                  <Navigate to="/onboarding" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/"
              element={
                isSignedIn ? (
                  <Navigate to="/onboarding" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/onboarding"
              element={
                isSignedIn ? (
                  isOnboarded ? (
                    <Navigate to="/home" />
                  ) : (
                    <FormPage />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {publicRoutes.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={
                  isSignedIn ? (
                    <Navigate to="/onboarding" />
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
            {privateRoutes.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                element={
                  isSignedIn ? <route.component /> : <Navigate to="/login" />
                }
              />
            ))}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LoadingContainer>
  );
}

export default App;
