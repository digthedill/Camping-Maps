import { Marker } from "@react-google-maps/api"

const UserMarkers = ({ markers, isSignedIn, setSelected }) => {
  return markers.map((marker) => (
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
        if (isSignedIn) {
          setSelected(marker)
        }
      }}
    />
  ))
}

export default UserMarkers
