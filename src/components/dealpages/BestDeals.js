import { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table'

export const BestDeals = () => {
   const [bestDeals, setBestDeals] = useState([])

   useEffect(
      () => {
         const fetchDeals = async () => {
            const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15`)
            const dealsArray = await response.json()
            setBestDeals(dealsArray)
         }
         fetchDeals()
      },
      []
   )

   return <>
         <Table striped border hover response>
         <thead>
            <tr>
               <th></th>
               <th>Game Title</th>
               <th>Normal Price</th>
               <th>Sale Price</th>
               <th>Meta Critic Rating</th>
            </tr>
         </thead>
         <tbody>
         {bestDeals.map(
            (deal) => {
               return (
                  <tr>
                     <td>{<img src={deal.thumb}></img>}</td>
                     <td>{deal.title}</td>
                     <td>{deal.normalPrice}</td>
                     <td>{deal.salePrice}</td>
                     <td>{deal.metacriticScore}</td>
                  </tr>)
                  }
               )
            }
            </tbody>
         </Table>
   </>
}