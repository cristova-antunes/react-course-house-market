import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"

import { getDoc, doc } from "firebase/firestore"
import { db } from "../firebase.config"

import { toast } from "react-toastify"

export default function Contact() {
  const [message, setMessage] = useState("")
  const [landlord, setLandlord] = useState(null)
  const [searchParams, SetSearchParams] = useSearchParams()

  const params = useParams()

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.landlordId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLandlord(docSnap.data())
      } else {
        toast.error("Could not get landlord data")
      }
    }

    getLandlord()
  }, [params.landlordId])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleOnChange = (e) => setMessage(e.target.value)
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>
      </header>

      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landlord?.name}</p>
          </div>

          <form onSubmit={handleSubmit} className="messageForm">
            <div className="messageDiv">
              <label
                htmlFor="message                  "
                className="messageLabel"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={handleOnChange}
              ></textarea>
            </div>

            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}
