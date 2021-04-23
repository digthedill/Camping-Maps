import { useState, useCallback, useRef } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import { FirebaseAuthConsumer } from "@react-firebase/auth"
import { formatRelative } from "date-fns"
import mapStyles from "./styles/mapStyles"

import AuthForm from "./components/AuthForm"
import Search from "./components/Search"
import LocateBtn from "./components/LocateBtn"

import indexStyle from "./styles/index.module.css"
import CampsiteInfoForm from "./components/CampsiteInfoForm"

// Map options
const libraries = ["places"]
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
}
const center = {
  lat: 41.8781,
  lng: -87.6298,
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

// TODO
/*

  On click -> popover form with information about campsite appears

  Info will detail user experience 

*/

function App() {
  const [createMarkerMode, setCreateMarkerMode] = useState(false)
  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)
  const [eventMarker, setEventMarker] = useState(null)
  const [toggleCreateCampsiteInfo, setToggleCreateCampsiteInfo] = useState(
    false
  )

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
    mapRef.current.setZoom(14)
  }, [])

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading maps..."

  return (
    <FirebaseAuthConsumer>
      {({ isSignedIn, user }) => {
        return (
          <div>
            {!isSignedIn ? <AuthForm /> : null}

            {toggleCreateCampsiteInfo ? (
              <CampsiteInfoForm
                setToggleCreateCampsiteInfo={setToggleCreateCampsiteInfo}
                setMarkers={setMarkers}
                eventMarker={eventMarker}
                user={user}
              />
            ) : null}
            <div className={indexStyle.mainLogo}>
              <h1>Pitch a Tent</h1>
              {isSignedIn ? (
                <button
                  onClick={() => {
                    setCreateMarkerMode(!createMarkerMode)
                  }}
                >
                  {createMarkerMode ? "Exit Create Mode" : "Set Camp"}
                </button>
              ) : null}
            </div>
            <div className={indexStyle.searchContainer}>
              <button onClick={() => setMarkers([])}>Clear</button>
              <Search panTo={panTo} isSignedIn={isSignedIn} />
            </div>
            <LocateBtn panTo={panTo} />

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={8}
              center={center}
              options={options(createMarkerMode)}
              onClick={onMapClick}
              onLoad={onMapLoad}
            >
              {markers.map((marker) => (
                <Marker
                  key={marker.time.toISOString()}
                  position={{
                    lat: marker.lat,
                    lng: marker.lng,
                  }}
                  icon={{
                    url: "https://pngimg.com/uploads/tent/tent_PNG47.png",
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                  }}
                  onClick={() => {
                    setSelected(marker)
                  }}
                />
              ))}

              {selected ? (
                <InfoWindow
                  position={{ lat: selected.lat, lng: selected.lng }}
                  onCloseClick={() => setSelected(null)}
                >
                  <div>
                    <h3>You Clicked!</h3>
                    <h4>User: {selected.user}</h4>
                    <p>{selected.description}</p>

                    <p>On: {formatRelative(selected.time, new Date())}</p>
                  </div>
                </InfoWindow>
              ) : null}
            </GoogleMap>
          </div>
        )
      }}
    </FirebaseAuthConsumer>
  )
}

export default App
