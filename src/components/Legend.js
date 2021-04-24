import indexStyle from "../styles/index.module.css"

const Legend = ({ isSignedIn, setCreateMarkerMode, createMarkerMode }) => {
  return (
    <div className={indexStyle.mainLogo}>
      <h1>Pitch a Tent</h1>
      {isSignedIn ? (
        <button
          onClick={() => {
            setCreateMarkerMode(!createMarkerMode)
          }}
        >
          {createMarkerMode ? "Exit Create Mode" : "Set Camp"}
        </button>
      ) : null}
    </div>
  )
}

export default Legend
