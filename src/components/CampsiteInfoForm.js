import { useState, useEffect } from "react"
import Geocode from "react-geocode"
import { v4 as uuidv4 } from "uuid"
import { db } from "../firebase/firebaseIndex"
import formStyles from "../styles/forms.module.css"

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

/**
 * 
 *setup support for update document

 pre-populate description textarea with value from db

 figure out second field (is it needed?)
 */

const CampsiteInfoForm = ({
  setToggleCreateCampsiteInfo,
  user,
  eventMarker,
  selected,
  setSelected,
}) => {
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState("")
  const [editMode, setEditMode] = useState(false)

  // eventMarker is the event attribute from onClick gMaps
  if (eventMarker) {
    Geocode.fromLatLng(eventMarker.latLng.lat(), eventMarker.latLng.lng()).then(
      (res) => {
        const address = res.results[0].formatted_address
        setAddress(address)
      }
    )
  }
  useEffect(() => {
    if (selected) {
      setEditMode(true)
      setDescription(selected.description)
    }
  }, [selected])

  // bind escape key with exit
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setToggleCreateCampsiteInfo(false)
      }
    }
    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [])

  // possible for users to upload photos?
  const handleSubmit = (e) => {
    e.preventDefault()
    let id = uuidv4()
    db.collection("markers")
      .doc(id)
      .set({
        id,
        lat: eventMarker.latLng.lat(),
        lng: eventMarker.latLng.lng(),
        time: new Date(),
        user: user.displayName,
        uid: user.uid,
        description,
        address,
      })
      .then(() => {
        console.log("Document written with ID: ")
      })
      .catch((error) => {
        console.error("Error adding document: ", error)
      })

    setToggleCreateCampsiteInfo(false)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    db.collection("markers")
      .doc(selected.id)
      .set({
        ...selected,
        description,
      })
    setSelected(null)
    setToggleCreateCampsiteInfo(false)
  }
  return (
    <div className={formStyles.container}>
      <form
        className={formStyles.form}
        onSubmit={editMode ? handleUpdate : handleSubmit}
      >
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
        {/**<label htmlFor="other">Other</label>
        <textarea id="other" /> */}
        <div className={formStyles.submitContainer}>
          <input
            type="submit"
            value={editMode ? "Update" : "Submit"}
            className={formStyles.submit}
          />
        </div>
      </form>
    </div>
  )
}

export default CampsiteInfoForm
