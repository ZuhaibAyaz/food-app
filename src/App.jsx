import Nav from  "./Components/Nav"
import {Outlet} from 'react-router-dom';
import Footer from "./Components/Footer"
import { useState } from "react";
import { CoordinatesProvider} from './utils/CoordinatesContext';


function App() {
 
  const [coordinates, setCoordinates] = useState({ lat: 26.87560, lng: 80.91150 });


  return (
    

    <>
      <div className=" bg-white   ">
      <CoordinatesProvider>
        <Nav setCoordinates={setCoordinates}  />
        <Outlet  coordinates={coordinates} />
      </CoordinatesProvider>
        <Footer />
      </div>
      
    </>
   
  )
}

export default App
