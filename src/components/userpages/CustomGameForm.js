import { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { PhotoUpload } from "../photoStorage/PhotoUpload"

export const CustomGameForm = () => {
  const localGamesUser = localStorage.getItem("capstone_user")
  const gamesUserObject = JSON.parse(localGamesUser)
  const [stores, setStores] = useState([])
  const [customGame, updateCustomGame] = useState({
    title: "",
    dateCreated: new Date(),
    pic: "",
    normPrice: 0,
    salePrice: 0,
    store: "",
    storeId: 1,
    uid: gamesUserObject.uid,
    notes: ""
  })
  const navigate = useNavigate()

  useEffect(
    () => {
       const fetchDeals = async () => {
          const response = await fetch(`https://www.cheapshark.com/api/1.0/stores`)
          const storesArray = await response.json()
          setStores(storesArray)
       }
       fetchDeals()
    },
    []
 )

  const handleSaveButtonClick = (event) => {
    event.preventDefault()
    
    const sendData = async () => {
      const options ={
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customGame)
      }
      const response = await fetch('http://localhost:8088/customGames', options);
      await response.json();
      navigate("/savedgames")
    }
    sendData()
  }

  return (
    <Form>
    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridTitle">
        <Form.Label>Title of Game</Form.Label>
        <Form.Control 
        placeholder="Enter title of your game" 
        value={customGame.title}
        onChange={
          (event) => {
              const copy = {...customGame}
              copy.title = event.target.value
              updateCustomGame(copy)
          }
        } />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPic">
        <Form.Label>Game Picture</Form.Label>
        <Form.Control 
        placeholder="URL here"
        value={customGame.pic}
        onChange={
          (event) => {
            const copy = {...customGame}
            copy.pic = event.target.value
            updateCustomGame(copy)
          }
        } />
        <Form.Text>
        Please upload the URL of the image you want to use
        </Form.Text>
      </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridCity">
        <Form.Label>Normal Price</Form.Label>
        <Form.Control 
        value={customGame.normPrice}
        onChange={
          (event) => {
              const copy = {...customGame}
              copy.normPrice = event.target.value
              updateCustomGame(copy)
          }
        } />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridZip">
        <Form.Label>Sale Price</Form.Label>
        <Form.Control 
        value={customGame.salePrice}
        onChange={
          (event) => {
              const copy = {...customGame}
              copy.salePrice = event.target.value
              updateCustomGame(copy)
          }
        } />
      </Form.Group>
    </Row>

    <Form.Group controlId="formGridState">
      <Form.Label>Store</Form.Label>
      <Form.Select
        value={customGame.store}
        onChange={
          (event) => {
            const copy = {...customGame}
            copy.store = event.target.value
            const setStoreId = stores.find(storeId => storeId.storeName === copy.store)
            copy.storeId = setStoreId.storeID          
            updateCustomGame(copy)
          }
        }
      >
        <option>Choose the Store this game is in...</option>
        {stores.map(
          (store) => {
            return (
              <option key={`store--${store.storeID}`}>{store.storeName}</option>
            )
          }
        )}
      </Form.Select>
    </Form.Group>

    <Button variant="primary" type="submit" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
      Submit
    </Button>
  </Form>
  )
}