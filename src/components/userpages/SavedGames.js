import { useEffect, useState } from "react"
import { Button, Card, CardGroup} from "react-bootstrap"
import { Link } from "react-router-dom"

export const SavedGames = () => {
   const [customGames, setCustomGames] = useState([])
   const [filteredGames, setFilteredGames] = useState([])

   const localGamesUser = localStorage.getItem("capstone_user")
   const gamesUserObject = JSON.parse(localGamesUser)

   useEffect(
      () => {
         const fetchCustomGames = async () => {
            const response = await fetch(`http://localhost:8088/customGames`);
            const customGamesArray = await response.json();
            setCustomGames(customGamesArray)
         }
         fetchCustomGames()
      },
      []
   )

   useEffect(
      () => {
        const filteredArray = customGames.filter((user) => user.uid === gamesUserObject.uid);
        setFilteredGames(filteredArray)
      },
      [customGames]
   )

   return (
      <>
         <CardGroup>
         {filteredGames.map(
            (game) => {
            return (
               <Card >
                  <Card.Img variant="top" src={game.pic} />
                  <Card.Body>
                     <Card.Title>{game.title}</Card.Title>
                     <Card.Text>
                        Normal Price: {game.normPrice}
                        Sale Price: {game.salePrice}
                        {game.notes}
                     </Card.Text>
                  </Card.Body>
                  <Link to={`/customgame/${game.id}`}><Button variant="primary">Edit</Button></Link>
                  <Card.Footer>
                     <small className="text-muted">Listed on {game.store}</small>
                  </Card.Footer>
               </Card>)
            }
            )}
         </CardGroup>
      <div className="d-grid gap-2">
         <Button variant="primary" size="lg" href="/customgameform">
         Want to add your own game? Click here!
         </Button>
      </div>   
      </>
   )
}