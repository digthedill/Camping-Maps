import { useState, useCallback, useRef, useEffect } from "react"
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { FirebaseAuthConsumer } from "@react-firebase/auth"

import Dashboard from "./components/Dashboard"
import Legend from "./components/Legend"
import AuthForm from "./components/AuthForm"
import Search from "./components/Search"
import LocateBtn from "./components/LocateBtn"
import CampsiteInfoForm from "./components/CampsiteInfoForm"
import ParkInfoWindow from "./components/ParkInfoWindow"
import UserInfoWindow from "./components/UserInfoWindow"
import UserMarkers from "./components/UserMarkers"
import ParkMarkers from "./components/ParkMarkers"

import indexStyle from "./styles/index.module.css"
import mapStyles from "./styles/mapStyles"

// import { fetchCampsites, fetchAllCampsites } from "./utils/fetchData"  data wasn't descriptive enough
// saving a record for recursive fetch calls

// Map options
const libraries = ["places"]
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
}
const center = {
  lat: 37.0902,
  lng: -95.7129,
}
// enable mouse change for create mode
const options = (createMode) => {
  return {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    draggableCursor: createMode ? "pointer" : "default",
  }
}

function App() {
  const [showDashboard, setShowDashboard] = useState(false)
  const [createMarkerMode, setCreateMarkerMode] = useState(false)
  const [markers, setMarkers] = useState([])
  const [parks, setParks] = useState([])
  const [selected, setSelected] = useState(null)
  const [selectedPark, setSelectedPark] = useState(null)
  const [eventMarker, setEventMarker] = useState(null)
  const [toggleCreateCampsiteInfo, setToggleCreateCampsiteInfo] = useState(
    false
  )

  useEffect(() => {
    const unsubscribe = () =>
      fetch(
        `https://developer.nps.gov/api/v1/campgrounds?&api_key=${process.env.REACT_APP_NPS_API_KEY}&limit=700`
      )
        .then((res) => res.json())
        .then((data) => {
          setParks(
            data.data.map((park) => {
              return {
                id: park.id,
                latLng: park.latLong,
                name: park.name,
                images: park.images,
                url: park.url,
                description: park.description,
              }
            })
          )
        })

    return unsubscribe()
  }, [])

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const onMapClick = useCallback(
    (e) => {
      if (createMarkerMode) {
        setToggleCreateCampsiteInfo(true)
        setEventMarker(e)
      }
    },
    [createMarkerMode]
  )

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng })
    mapRef.current.setZoom(12)
  }, [])

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading maps..."
  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user }) => {
        return (
          <div>
            {!isSignedIn ? <AuthForm /> : null}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png"
              className={indexStyle.toggleDashboard}
              onClick={() => setShowDashboard(!showDashboard)}
              alt="Toggle User Profile"
            />

            {showDashboard ? (
              <Dashboard user={user} setSelected={setSelected} />
            ) : null}

            <Legend
              isSignedIn={isSignedIn}
              setCreateMarkerMode={setCreateMarkerMode}
              createMarkerMode={createMarkerMode}
            />

            {/**Form for users to document their camp experiences */}
            {toggleCreateCampsiteInfo ? (
              <CampsiteInfoForm
                setToggleCreateCampsiteInfo={setToggleCreateCampsiteInfo}
                eventMarker={eventMarker}
                user={user}
                selected={selected}
                setSelected={setSelected}
              />
            ) : null}

            {/**Utility Features: Search for a location and pan to current location */}
            <div className={indexStyle.searchContainer}>
              <Search panTo={panTo} isSignedIn={isSignedIn} />
            </div>

            <LocateBtn panTo={panTo} />

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={5}
              center={center}
              options={options(createMarkerMode)}
              onClick={onMapClick}
              onLoad={onMapLoad}
            >
              {/**User created markers  */}
              <UserMarkers
                isSignedIn={isSignedIn}
                setMarkers={setMarkers}
                markers={markers}
                setSelected={setSelected}
              />
              {/**Markers generated by National Parks Services API */}
              <ParkMarkers
                parks={parks}
                isSignedIn={isSignedIn}
                setSelectedPark={setSelectedPark}
              />
              {/**Info Window for the NPS API Campgrounds */}
              <ParkInfoWindow
                selectedPark={selectedPark}
                setSelectedPark={setSelectedPark}
              />

              {/**Info Window using user input */}
              <UserInfoWindow
                selected={selected}
                setSelected={setSelected}
                user={user}
                setToggleCreateCampsiteInfo={setToggleCreateCampsiteInfo}
              />
            </GoogleMap>
          </div>
        )
      }}
    </FirebaseAuthConsumer>
  )
}

export default App
