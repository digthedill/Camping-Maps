const extractLatLng = (str, dir) => {
  if (str) {
    const arr = str.split(":")
    let lat = parseFloat(arr[1].split(",")[0])
    let lng = parseFloat(arr[arr.length - 1].slice(0, -1))
    if (dir === "lat") {
      return lat
    } else {
      return lng
    }
  }
}

export default extractLatLng
