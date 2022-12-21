import { useEffect, useState } from "react"
import { Dropdown, DropdownButton } from "react-bootstrap"
import Table from 'react-bootstrap/Table'

export const BestDeals = () => {
   const [bestDeals, setBestDeals] = useState([])
   const [stores, setStores] = useState([])
   const [storeId, setStoreId] = useState(1)
   const [storeName, setStoreName] = useState("Steam")

   useEffect(
      () => {
         const fetchDeals = async () => {
            const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=${storeId}&metacritic=80`)
            const dealsArray = await response.json()
            setBestDeals(dealsArray)
         }
         fetchDeals()
      },
      [storeId]
   )

   useEffect(
      () => {
         const fetchDeals = async () => {
            const response = await fetch(`https://www.cheapshark.com/api/1.0/stores?isActive=1`)
            const storesArray = await response.json()
            setStores(storesArray)
         }
         fetchDeals()
      },
      []
   )

   return <>
    <DropdownButton id="dropdown-basic-button" title="Please Select What Store you wish to view">
    {stores.map(
          (store) => {
            if(store.isActive === 1) {
               return (
                  <Dropdown.Item href="#/store--" value={store.storeID} key={`store--${store.storeID}`} onClick={
                  () => {
                     const copy = {...store}
                     setStoreName(copy.storeName)
                     setStoreId(copy.storeID)
                  }
                  }>{store.storeName}</Dropdown.Item>
            )} else {
               return ""
            }
          }
        )}
    </DropdownButton>
      <Table striped border="true" hover responsive>
      <thead>
         <tr>
            <th>{storeName}</th>
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
                     <td>{<img src={deal.thumb} alt="thumbnail for game" width={120} height={45}></img>}</td>
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