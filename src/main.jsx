import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import Body from "./Components/Body";
import Cart from "./Components/Cart.jsx"
import RestaurantMenu from './Components/RestaurantMenu.jsx';
import appStore from './utils/appStore.js';
import { Provider } from 'react-redux';
import Search from './Components/Search.jsx';





const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/", 
        element: <Body/>, 
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />
        
      },
      {
        path: "/search/restaurant/:resId",
        element: <RestaurantMenu />
        
      },
      {
        path: "/cart",
        element: <Cart/>,
      },
      {
        path: "/search",
        element: <Search />,
      },
      
      
    ],
  }
 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={appStore}>
    <RouterProvider router={appRouter} />
    </Provider>
 
);
