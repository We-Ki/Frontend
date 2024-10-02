import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Analytics from "./pages/Analytics";
import Manage from "./pages/Manage";
import Farms from "./pages/Farms";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import "./App.css";
import NotFound from "./pages/NotFound";

import { IsLoginProvider } from "./contexts/IsLoginContext";
import PrivateRoute from "./routes/PrivateRoute";

import mainMenu from "./navMenus/mainMenu";
import farmMenu from "./navMenus/farmMenu";

import FooterLayout from "./layouts/FooterLayout";
import DefaultLayout from "./layouts/DefaultLayout";

const Demo = () => {
  return (
    <Router>
      <IsLoginProvider>
        <Routes>
          <Route element={<FooterLayout menus={mainMenu} />}>
            <Route
              exact
              path="/"
              element={<PrivateRoute component={<Home />} />}
            />
            <Route
              path="/farms"
              element={<PrivateRoute component={<Farms />} />}
            />
            <Route
              path="/mypage"
              element={<PrivateRoute component={<MyPage />} />}
            />
          </Route>

          <Route element={<FooterLayout menus={farmMenu} />}>
            <Route
              path="/manage/:farmId" // 농장의 ID를 URL에 포함
              element={<PrivateRoute component={<Manage />} />}
            />
            <Route
              path="/analytics/:farmId"
              element={<PrivateRoute component={<Analytics />} />}
            />
          </Route>

          <Route element={<DefaultLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>

          <Route path="*" element={<PrivateRoute component={<NotFound />} />} />
        </Routes>
      </IsLoginProvider>
    </Router>
  );
};

export default Demo;
