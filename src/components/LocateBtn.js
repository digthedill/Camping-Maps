import locateBtnStyle from "../styles/locateBtn.module.css"

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
    <div className={locateBtnStyle.locateBtn}>
      <button onClick={handleClick}>
        <img src="https://freesvg.org/img/CompassRose.png" alt="" />
      </button>
    </div>
  )
}

export default Locate
