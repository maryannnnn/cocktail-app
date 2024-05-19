import './scss/app.scss'
import React, {FC} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from "../widgets/footer/Footer";
import Navigation from "../widgets/navigation/Navigation";
import Cocktails from "../pages/cocktails/Cocktails";
import CocktailPage from "../pages/cocktail-page/CocktailPage";

const App: FC = () => {

  return (
      <div className="wrapper">
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Cocktails />} />
            <Route path="/drink/:id" element={<CocktailPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
  );
}
export default App;

