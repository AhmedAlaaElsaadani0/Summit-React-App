import React from 'react';
import './App.css';
import Home from './Components/HomeComponent/Home';
import About from './Components/AboutComponent/About';
import Contactus from './Components/ContactusComponent/Contactus';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './Components/RootLayout/RootLayout';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import Area from './Components/AreaComponent/Area';
import Rent from './Components/RentComponent/Rent';
import Buy from './Components/Buy/Buy';
let routers = createBrowserRouter([
  {path:'/', element: <RootLayout/>, children:[
    {index:true, element: <Home/>},
    {path:'About', element: <About/>},
    {path:'Contact', element: <Contactus/>},
    {path:'Area', element: <Area/>},
    {path:'Rent', element: <Rent/>},
    {path:'Buy', element: <Buy/>},
  

      ]},
    {path:'*', element: <ErrorPage/>}

])

function App() {
  return <React.Fragment>
   <RouterProvider router={routers}/>

</React.Fragment>
}

export default App;
