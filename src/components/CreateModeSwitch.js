import Switch from "react-switch"
import indexStyle from "../styles/index.module.css"

const CreateModeSwitch = ({ createMarkerMode, setCreateMarkerMode }) => {
  return (
    <div className={indexStyle.legendItem}>
      <label>
        <Switch
          onChange={() => setCreateMarkerMode(!createMarkerMode)}
          checked={createMarkerMode}
          checkedIcon={false}
          uncheckedIcon={false}
          width={40}
          height={20}
          handleDiameter={15}
        />
      </label>
      <p>Create Mode</p>
    </div>
  )
}

export default CreateModeSwitch
