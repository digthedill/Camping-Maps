import { Marker } from "@react-google-maps/api"
import extractLatLng from "../utils/extractLatLng"

const ParkMarkers = ({ parks, isSignedIn, setSelectedPark }) => {
  return parks
    ? parks.map((park) => {
        const lat = extractLatLng(park.latLng, "lat")
        const lng = extractLatLng(park.latLng, "lng")
        if (lat && lng)
          // prevents error from faulty nps return
          return (
            <Marker
              key={park.id}
              position={{
                lat,
                lng,
              }}
              icon={{
                url:
                  "https://www.iconpacks.net/icons/2/free-tree-icon-1578-thumb.png",
                scaledSize: new window.google.maps.Size(15, 15),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => {
                if (isSignedIn) {
                  setSelectedPark(park)
                }
              }}
            />
          )
      })
    : null
}

export default ParkMarkers
