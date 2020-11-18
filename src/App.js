// import ReactDOM from "react-dom"
import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl"
import "./App.css";
import axios from 'axios'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const App = () => {
  const mapContainerRef = useRef(null);
  const [lng, setlng] = useState(106.8385)
  const [lat, setlat] = useState(-6.1786)
  const [zoom, setzoom] = useState(14)
  const [address, setaddress] = useState("")

  function getAddress(long,latit) {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${latit}.json?access_token=pk.eyJ1IjoiYWxlc2FuZHJvZ2VyYXJkIiwiYSI6ImNraG05ajdwNjA5OGYyeXFmeGp1ZHh5b3oifQ.K1CU3YqUh16FWJsLjO0h7g`)
      .then(function (response) {
        setaddress(response.data.features[0].properties.address)
        console.log(response.data.features[0].properties.address, "<<<<<<RESPONSEEEEEEEEE");
      })
      .catch(function (error) {
        console.log(error, "<<<<<<<<<<ERRRORRRRRRR");
      });
  }

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom
    })

    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.on('style.load', function () {
      map.on('click', function (e) {
        let coordinates = e.lngLat;
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`Confirm Your Location: <br/>` + coordinates)
          .addTo(map)
        console.log(coordinates,"<<<<<<<<<<<<KOOORDINATTT")
        setlng(coordinates.lng)
        setlat(coordinates.lat)
        const long = coordinates.lng
        const latit = coordinates.lat
        getAddress(long,latit)
      });
    })

    map.on('move', () => {
      setzoom(map.getZoom().toFixed(2))
    })

    // clean up on unmount
    return () => map.remove();
  }, []);


  return (
    <>
      <div className='sidebarStyle'>
  <div>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}, {address}</div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </>
  )
};

export default App;
