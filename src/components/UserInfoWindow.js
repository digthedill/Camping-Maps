import { InfoWindow } from "@react-google-maps/api"
import { formatRelative } from "date-fns"

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

        <p>On: {formatRelative(selected.time, new Date())}</p>
      </div>
    </InfoWindow>
  ) : null
}

export default UserInfoWindow
