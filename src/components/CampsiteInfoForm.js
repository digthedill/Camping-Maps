import { useState } from "react"
import Geocode from "react-geocode"
import formStyles from "../styles/forms.module.css"

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

const CampsiteInfoForm = ({
  setToggleCreateCampsiteInfo,
  user,
  setMarkers,
  eventMarker,
}) => {
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")

  if (eventMarker) {
    Geocode.fromLatLng(eventMarker.latLng.lat(), eventMarker.latLng.lng()).then(
      (res) => {
        const address = res.results[0].formatted_address
        setAddress(address)
      }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setMarkers((current) => [
      ...current,
      {
        lat: eventMarker.latLng.lat(),
        lng: eventMarker.latLng.lng(),
        time: new Date(),
        user: user.displayName,
        description,
        address,
      },
    ])
    setToggleCreateCampsiteInfo(false)
  }

  return (
    <div className={formStyles.container}>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <div className={formStyles.exitContainer}>
          <button
            className={formStyles.exit}
            onClick={() => setToggleCreateCampsiteInfo(false)}
          >
            X
          </button>
        </div>
        <h2>Lets hear about</h2>
        <h3>{address}</h3>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="other">Other</label>
        <textarea id="other" />
        <div className={formStyles.submitContainer}>
          <input type="submit" value="Submit" className={formStyles.submit} />
        </div>
      </form>
    </div>
  )
}

export default CampsiteInfoForm
