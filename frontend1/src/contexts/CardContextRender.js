import React from "react";
import api from "../utils/api";

export const CardContextRender = React.createContext();

export const CardRenderProvider = ({ children }) => {
  const [cards, setInitialCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        if (!data){
          return
        }

        setInitialCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setInitialCards]);


  return (
    <CardContextRender.Provider value={{ cards, setInitialCards }}>
      {children}
    </CardContextRender.Provider>
  );
};
