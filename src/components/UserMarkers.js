import { useEffect } from "react"
import { Marker } from "@react-google-maps/api"
import { db } from "../firebase/firebaseIndex"

const markersRef = db.collection("markers")

const UserMarkers = ({ setMarkers, markers, isSignedIn, setSelected }) => {
  useEffect(() => {
    const unsubscribe = markersRef.onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data())
      setMarkers(data)
    })

    //to prevent memory leak
    return () => unsubscribe()
  }, [])

  return markers
    ? markers.map((marker) => (
        <Marker
          key={new Date(marker.time.seconds * 1000).toISOString()}
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
    : null
}

export default UserMarkers
