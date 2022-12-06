import { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table'

export const BestDeals = () => {
   const [bestDeals, setBestDeals] = useState([])

   useEffect(
      () => {
         const fetchDeals = async () => {
            const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&metacritic=80`)
            const dealsArray = await response.json()
            setBestDeals(dealsArray)
         }
         fetchDeals()
      },
      []
   )

   return <>
      <Table striped border="true" hover responsive>
      <thead>
         <tr>
            <th></th>
            <th>Game Title</th>
            <th>Normal Price</th>
            <th>Sale Price</th>
            <th>Meta Critic Rating</th>
            <th>Deal Rating</th>
         </tr>
      </thead>
      <tbody>
         {bestDeals.map(
            (deal) => {
               return (
                  <tr key={`gameID--${deal.gameID}`}>
                     <td>{<img src={deal.thumb} alt="thumbnail for game"></img>}</td>
                     <td>{deal.title}</td>
                     <td>{deal.normalPrice}</td>
                     <td>{deal.salePrice}</td>
                     <td>{deal.metacriticScore}</td>
                     <td>{deal.dealRating}</td>
                  </tr>)
                  }
               )
            }
         </tbody>
      </Table>
   </>
}