const Locate = ({ panTo }) => {
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      () => null
    )
  }
  return (
    <div className="locate-btn">
      <button onClick={handleClick}>
        <img src="https://freesvg.org/img/CompassRose.png" alt="" />
      </button>
    </div>
  )
}

export default Locate
