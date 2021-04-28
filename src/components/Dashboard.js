import { useState, useEffect } from "react"
import style from "../styles/dashboard.module.css"
import { db } from "../firebase/firebaseIndex"
import StarRatingComponent from "react-star-rating-component"
import formatFirstName from "../utils/formatFirstName"

const Dashboard = ({ user, setSelected }) => {
  const [campsites, setCampsites] = useState([])

  useEffect(() => {
    db.collection("markers")
      .where("uid", "==", user.uid)
      .get()
      .then((query) => {
        query.forEach((doc) => {
          setCampsites((c) => [...c, doc.data()])
        })
      })
      .catch((e) => console.log(e))
  }, [user.id, user.uid])

  const openCampsite = (campsite) => {
    setSelected(campsite)
  }

  return user ? (
    <div className={style.container}>
      <div className={style.dashboard}>
        <h3 className={style.title}>
          {formatFirstName(user.displayName)}'s Sites
        </h3>
        {campsites.length
          ? campsites.map((campsite) => {
              return (
                <div key={campsite.id} className={style.campsiteBox}>
                  {campsite.imgUrls.length ? (
                    <div>
                      <img
                        src={campsite.imgUrls[0].url}
                        className={style.thumbnail}
                        alt={campsite.address}
                      />
                    </div>
                  ) : null}
                  <div className={style.info}>
                    <p>{campsite.address}</p>
                    <div className={style.ratingAndBtn}>
                      <StarRatingComponent
                        name="rating"
                        value={campsite.rating}
                      />
                      <button
                        className={style.viewBtn}
                        onClick={() => openCampsite(campsite)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          : null}
      </div>
    </div>
  ) : null
}

export default Dashboard
