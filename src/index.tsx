import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import StudentRegistration from "./components/StudentRegistration";
import MainPage from "./components/MainPage";
import Processing from "./components/Processing";
import HomePage from "./components/HomePage";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import StudentLogin from './components/StudentLogin';
import HowToUse from './components/HowToUse';
import Printer from './components/Printer';
import User from './components/User';
import AddTokens from './components/AddTokens';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <App child={<MainPage />} />
    )
  },
  {
    path: '/register',
    element: (
      <App child={<StudentRegistration />} />
    )
  },
  {
    path: '/processing',
    element: (
      <App child={<Processing />} />
    )
  },
  {
    path: '/mypage',
    element: (
      <App child={<HomePage />} />
    )
  },
  {
    path: '/login',
    element: (
      <App child={<StudentLogin />} />
    )
  },
  {
    path: '/printer',
    element: (
      <App child={<Printer />} />
    )
  },
  {
    path: '/user',
    element: (
      <App child={<User />} />
    )
  },
  {
    path: '/usage',
    element: (
      <App child={<HowToUse />} />
    )
  },
  {
    path: '/charge',
    element: (
      <App child={<AddTokens />}/>
    )
  }
])

const root = ReactDOM.createRoot(document.getElementById('root')!!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
