import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Layout from './Layout.jsx'
import { Home, Navbar, Paste, ViewPaste } from './components/index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element= { <Layout />} >
      <Route path='' element= { <Home />} />
      <Route path='pastes' element= { <Paste />} />
      <Route path='pastes/:id' element= { <ViewPaste />} />
    </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);