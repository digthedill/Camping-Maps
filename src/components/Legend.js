import CreateModeSwitch from "./CreateModeSwitch"
import indexStyle from "../styles/index.module.css"

const Legend = ({ isSignedIn, setCreateMarkerMode, createMarkerMode }) => {
  return (
    <div className={indexStyle.legendContainer}>
      <h1>Pitch a Tent</h1>
      <div>
        <div className={indexStyle.legendItem}>
          <img
            src="https://www.iconpacks.net/icons/2/free-tree-icon-1578-thumb.png"
            width="15"
            height="15"
            alt="tree"
          />
          <p>NPS Official Campground</p>
        </div>
        <div className={indexStyle.legendItem}>
          <img
            src="https://pngimg.com/uploads/tent/tent_PNG47.png"
            width="15"
            height="15"
            alt="tent"
          />
          <p>User Campsite</p>
        </div>
      </div>
      {isSignedIn ? (
        <>
          <CreateModeSwitch
            createMarkerMode={createMarkerMode}
            setCreateMarkerMode={setCreateMarkerMode}
          />
          <p className={indexStyle.subtitle}>(Toggle to save a campsite)</p>
        </>
      ) : null}
    </div>
  )
}

export default Legend
