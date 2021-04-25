import { InfoWindow } from "@react-google-maps/api"
import { db } from "../firebase/firebaseIndex"
import style from "../styles/userInfoWindow.module.css"

const UserInfoWindow = ({
  selected,
  setSelected,
  user,
  setToggleCreateCampsiteInfo,
}) => {
  const deleteCampsite = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      db.collection("markers").doc(selected.id).delete()
      setSelected(null)
    }
  }

  return selected ? (
    <InfoWindow
      position={{ lat: selected.lat, lng: selected.lng }}
      onCloseClick={() => setSelected(null)}
    >
      <div>
        <h3 className={style.address}>{selected.address}</h3>
        <h4 className={style.rightAlign}>User: {selected.user}</h4>
        <p className={style.rightAlign}>
          On:{" "}
          {new Date(selected.time.seconds * 1000).toLocaleDateString("en-US")}
        </p>
        <p className={style.description}>{selected.description}</p>

        {selected.uid === user.uid ? ( //edit and delete for users
          <div className={style.adminContainer}>
            <button
              className={style.edit}
              onClick={() => setToggleCreateCampsiteInfo(true)}
            >
              Edit Info
            </button>
            <button className={style.delete} onClick={deleteCampsite}>
              Delete Campsite
            </button>
          </div>
        ) : null}
      </div>
    </InfoWindow>
  ) : null
}

export default UserInfoWindow
