import { InfoWindow } from "@react-google-maps/api"
import extractLatLng from "../utils/extractLatLng"
import parkStyles from "../styles/park.module.css"

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
        <div className={parkStyles.parkImgContainer}>
          {selectedPark.images.map((img) => {
            return (
              <img
                key={img.caption}
                src={img.url}
                alt={img.altText}
                className={parkStyles.parkImg}
              />
            )
          })}
        </div>
      </div>
    </InfoWindow>
  ) : null
}

export default ParkInfoWindow
