import React from "react";
import api from "../utils/api";

export const CardContextRender = React.createContext();

export const CardRenderProvider = ({ children }) => {
  const [cards, setInitialCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
          
        setInitialCards(data);
      })
      .catch((err) => {
       console.log(err)
      });
  }, [setInitialCards]);
  
  const memoHookCard = React.useMemo(
    () => ({ cards, setInitialCards }),
    [cards, setInitialCards]
  );
  return (
    <CardContextRender.Provider value={memoHookCard}>
      {children}
    </CardContextRender.Provider>
  );
};
