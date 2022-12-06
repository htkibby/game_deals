import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { BestDeals } from "../dealpages/BestDeals";
import { CheapestDeals } from "../dealpages/CheapestDeals";
import { PhotoUpload } from "../photoStorage/PhotoUpload";
import { SavedGames } from "../userpages/SavedGames";

export const ApplicationViews = () => {
  let navigate = useNavigate();

  return (
    <Routes>
      <Route path="/"element={
        <>
          <h1>A Blank Page!!</h1>

          <Outlet />
        </>
      }>

        </Route>
          <Route path="bestdeals" element={<BestDeals />} />
          <Route path="cheapestdeals" element={<CheapestDeals />} />
          <Route path="savedgames" element={<SavedGames/>} />
          <Route path="photoupload" element={<PhotoUpload />} />
    </Routes>
  );
};
