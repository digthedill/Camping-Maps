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

import useWindowDimensions from "./hooks/useWindowDimensions"
import useFetch from "./hooks/useFetch"

import indexStyle from "./styles/index.module.css"
import mapStyles from "./styles/mapStyles"

import userIcon from "./assets/userIcon.png"
import CreateModeSwitch from "./components/CreateModeSwitch"

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
const options = (createMode, mobileBoolForZoom) => {
  return {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: mobileBoolForZoom,
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

  const { width } = useWindowDimensions()

  const responsiveZoomControls = width < 968 ? false : true

  const url = `https://developer.nps.gov/api/v1/campgrounds?&api_key=${process.env.REACT_APP_NPS_API_KEY}&limit=700`

  const { data } = useFetch(url)

  useEffect(() => {
    if (data.data) {
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
    }
  }, [data])

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
            {!isSignedIn && <AuthForm />}

            {isSignedIn && showDashboard ? (
              <Dashboard
                user={user}
                setSelected={setSelected}
                setShowDashboard={setShowDashboard}
              />
            ) : null}
            {isSignedIn && (
              <Legend
                isSignedIn={isSignedIn}
                setCreateMarkerMode={setCreateMarkerMode}
                createMarkerMode={createMarkerMode}
              />
            )}
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
              <div className={indexStyle.mobileCreateToggle}>
                <CreateModeSwitch
                  createMarkerMode={createMarkerMode}
                  setCreateMarkerMode={setCreateMarkerMode}
                />
              </div>
            </div>
            <div className={indexStyle.auxContainer}>
              <div className={indexStyle.locateBtn}>
                <LocateBtn panTo={panTo} />
              </div>
              {isSignedIn && (
                <img
                  src={userIcon}
                  className={indexStyle.toggleDashboard}
                  onClick={() => setShowDashboard(!showDashboard)}
                  alt="Toggle User Profile"
                />
              )}
            </div>

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={5}
              center={center}
              options={options(createMarkerMode, responsiveZoomControls)}
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
