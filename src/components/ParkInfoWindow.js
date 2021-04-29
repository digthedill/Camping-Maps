import { InfoWindow } from "@react-google-maps/api"
import extractLatLng from "../utils/extractLatLng"
import parkStyles from "../styles/infoWindow.module.css"

const ParkInfoWindow = ({ selectedPark, setSelectedPark }) => {
  return selectedPark ? (
    <InfoWindow
      position={{
        lat: extractLatLng(selectedPark.latLng, "lat"),
        lng: extractLatLng(selectedPark.latLng, "lng"),
      }}
      onCloseClick={() => setSelectedPark(null)}
    >
      <div>
        <h3>{selectedPark.name}</h3>
        <p className={parkStyles.description}>
          {selectedPark.description}{" "}
          <a href={selectedPark.url} target="_blank" rel="noreferrer">
            Book It!
          </a>
        </p>
        <div className={parkStyles.imgContainer}>
          {selectedPark.images.map((img, i) => {
            return (
              <img
                key={img.caption + i}
                src={img.url}
                alt={img.altText}
                className={parkStyles.image}
              />
            )
          })}
        </div>
      </div>
    </InfoWindow>
  ) : null
}

export default ParkInfoWindow
