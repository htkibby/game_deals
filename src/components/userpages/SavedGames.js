import { useEffect, useState } from "react"
import { Card, CardGroup } from "react-bootstrap"

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
                  <Card.Footer>
                     <small className="text-muted">Last updated 3 mins ago</small>
                  </Card.Footer>
               </Card>)
            }
            )}
         </CardGroup>
      </>
   )
}