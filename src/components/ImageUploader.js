import { useRef, useState } from "react"

import style from "../styles/forms.module.css"

const ImageUploader = ({ setImgUrls, selected }) => {
  const [images, setImages] = useState([])
  const [progress, setProgress] = useState(0)
  const fileSelect = useRef(null)

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      // console.log(files[i])
      uploadFile(files[i])
    }
  }

  function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/dilldog-industries/upload`
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    xhr.open("POST", url, true)
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", (e) => {
      setProgress(Math.round((e.loaded * 100.0) / e.total))
      console.log(Math.round((e.loaded * 100.0) / e.total))
    })

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText)
        console.log(response)
        const img = {
          url: response.secure_url,
          id: response.asset_id,
        }
        setImages((c) => [...c, img])
        setImgUrls((c) => [...c, img])
      }
    }
    fd.append("upload_preset", "yd5ugm5d")
    fd.append("tags", "browser_upload")
    fd.append("file", file)
    xhr.send(fd)
  }

  function removeImage(id) {
    setImages((c) => c.filter((img) => img.id !== id))

    if (window.confirm("Are you sure you want to delete the image?"))
      setImgUrls((c) => c.filter((img) => img.id !== id))
  }
  return images.length ? (
    <div className={style.previewOuterContainer}>
      {images.map((image) => {
        return (
          <div className={style.imgPreviewContainer} key={image.id}>
            <button
              onClick={() => removeImage(image.id)}
              className={style.removeImg}
            >
              x
            </button>
            <img
              src={image.url.replace("upload/", "upload/w_600/")}
              // style={{ height: 400, width: 600 }}
              className={style.imagePreview}
              alt="thumbnail from user"
            />
          </div>
        )
      })}
    </div>
  ) : selected.imgUrls.length ? (
    <div className={style.previewOuterContainer}>
      {selected.imgUrls.map((image) => {
        return (
          <div className={style.imgPreviewContainer} key={image.id}>
            <button
              onClick={() => removeImage(image.id)}
              className={style.removeImg}
            >
              x
            </button>
            <img
              src={image.url.replace("upload/", "upload/w_600/")}
              // style={{ height: 400, width: 600 }}
              className={style.imagePreview}
              alt="thumbnail from user"
            />
          </div>
        )
      })}
    </div>
  ) : (
    <form>
      {progress > 0 ? (
        <div className={style.progressContainer}>
          <span className={style.progress}>{progress}%</span>
        </div>
      ) : (
        <input
          ref={fileSelect}
          type="file"
          accept="image/*"
          name="Images"
          onChange={(e) => handleFiles(e.target.files)}
          multiple
        />
      )}
    </form>
  )
}

export default ImageUploader
