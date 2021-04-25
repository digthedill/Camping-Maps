// const limitPerPage = 20
// const url = `https://ridb.recreation.gov/api/v1/campsites/?apikey=ba32d887-2069-423c-958c-3181bd6cd33b`

// const getParks = async (pageNo = 0) => {
//   let actualUrl = url + `&offset=${pageNo}&limit=${limitPerPage}`
//   try {
//     const config = {
//       method: "get",
//       mode: "no-cors",
//     }
//     await fetch(actualUrl, config).then(async (res) => {
//       const json = await res.json()

//       if (res.ok) {
//         return json
//       }
//       throw await json
//     })
//   } catch (e) {
//     console.log("ERROR:", e)
//   }
// }

// const getAllParks = async (pageNo = 0) => {
//   const results = await getParks(pageNo)
//   console.log(results)
//   console.log("Retreiving data from API for page : " + pageNo)

//   if (results.length > 0) {
//     return results.concat(await getAllParks(pageNo + 20))
//   } else {
//     return results
//   }
// }

// export default getParks
