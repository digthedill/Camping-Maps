const url = `https://campsite-proxy-server.herokuapp.com/`

async function fetchCampsites(offset = 0) {
  try {
    let paginatedUrl = url + `?offset=${offset}`
    const response = await fetch(paginatedUrl)
    let data = await response.json()
    // console.log(data)
    return data
  } catch (e) {
    console.log(e)
  }
}

async function fetchAllCampsites(offset = 0) {
  try {
    const { RECDATA } = await fetchCampsites(offset)
    // console.log("Retreiving data from API for offset : " + offset)
    // console.log(RECDATA)
    if (RECDATA.length) {
      return RECDATA.concat(fetchAllCampsites(offset + 50))
    } else {
      return RECDATA
    }
  } catch (e) {
    console.log(e)
  }
}

export { fetchAllCampsites, fetchCampsites }
