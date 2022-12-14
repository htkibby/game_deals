import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { BestDeals } from "../dealpages/BestDeals";
import { CheapestDeals } from "../dealpages/CheapestDeals";
import { PhotoUpload } from "../photoStorage/PhotoUpload";
import { CustomGameForm } from "../userpages/CustomGameForm";
import { EditGameForm } from "../userpages/EditGameForm";
import { SavedGames } from "../userpages/SavedGames";

export const ApplicationViews = () => {

  return (
    <Routes>
      <Route path="/"element={
        <>
          <h1>Welcom to Game Deals</h1>

          <Outlet />
        </>
      }>

        </Route>
          <Route path="bestdeals" element={<BestDeals />} />
          <Route path="cheapestdeals" element={<CheapestDeals />} />
          <Route path="savedgames" element={<SavedGames />} />
          <Route path="photoupload" element={<PhotoUpload />} />
          <Route path="customgameform" element={<CustomGameForm />} />
          <Route path="customgame/:customGamesId" element={<EditGameForm />} />
    </Routes>
  );
};
