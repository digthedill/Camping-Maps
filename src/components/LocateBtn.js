import compass from "../assets/compass.png"

const Locate = ({ panTo }) => {
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      () => null
    )
  }
  return (
    <button onClick={handleClick}>
      <img src={compass} alt="locate yourself" />
    </button>
  )
}

export default Locate
