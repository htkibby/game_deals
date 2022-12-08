import { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Navigate, useNavigate, useParams } from "react-router-dom"

export const EditGameForm = () => {
   const {customGamesId} = useParams()
   const localGamesUser = localStorage.getItem("capstone_user")
   const gamesUserObject = JSON.parse(localGamesUser)
   const [customGame, setCustomGame] = useState({})
   const [stores, setStores] = useState([])
   const navigate = useNavigate()

   useEffect(
      () => {
         const fetchGame = async () => {
            const response = await fetch(`http://localhost:8088/customGames/${customGamesId}`)
            const customGameObj = await response.json()
            setCustomGame(customGameObj)
         }
         fetchGame()
      },
      [customGamesId]
   )

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

   const handleEditButtonClick = (event) => {
      event.preventDefault()

      const gameToSendToAPI = {
         title: customGame.title,
         dateCreated: customGame.dateCreated,
         pic: customGame.pic,
         normPrice: +customGame.normPrice,
         salePrice: +customGame.salePrice,
         store: customGame.store,
         storeId: +customGame.storeId,
         uid: gamesUserObject.uid,
         notes: customGame.notes
      }

      const putGame = async () => {
         await fetch(`http://localhost:8088/customGames/${customGame.id}`, {
            method : 'PUT',
            headers: {
               "Content-Type" : "application/json"
            },
            body : JSON.stringify(gameToSendToAPI)
         })
         navigate('/savedgames')
      }
      putGame()
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
                setCustomGame(copy)
            }
          } />
        </Form.Group>
  
        <Form.Group as={Col} controlId="formGridPic">
          <Form.Label>Game Picture</Form.Label>
          <Form.Control type="file" />
          <Form.Text>
          Please upload a thumbnail image of the game 
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
                setCustomGame(copy)
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
                  setCustomGame(copy)
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
              setCustomGame(copy)
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
  
      <Button variant="primary" type="submit" onClick={(clickEvent) => handleEditButtonClick(clickEvent)}>
        Submit
      </Button>
    </Form>
   )
}