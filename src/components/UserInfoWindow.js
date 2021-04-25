import { InfoWindow } from "@react-google-maps/api"

// if uid === user.uid
// unlock editing and delete functions

const UserInfoWindow = ({ selected, setSelected }) => {
  return selected ? (
    <InfoWindow
      position={{ lat: selected.lat, lng: selected.lng }}
      onCloseClick={() => setSelected(null)}
    >
      <div>
        <h3>{selected.address}</h3>
        <h4>User: {selected.user}</h4>
        <p>{selected.description}</p>

        <p>
          On:{" "}
          {new Date(selected.time.seconds * 1000).toLocaleDateString("en-US")}
        </p>
      </div>
    </InfoWindow>
  ) : null
}

export default UserInfoWindow
