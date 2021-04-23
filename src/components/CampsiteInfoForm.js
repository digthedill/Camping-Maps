import { useState } from "react"
import formStyles from "../styles/forms.module.css"

const CampsiteInfoForm = ({
  setToggleCreateCampsiteInfo,
  user,
  setMarkers,
  eventMarker,
}) => {
  const [description, setDescription] = useState("")

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
      },
    ])
    setToggleCreateCampsiteInfo(false)
  }
  console.log(user)

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

        <h1>Tell Us About the Site</h1>
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
