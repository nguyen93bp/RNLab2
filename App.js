import React from "react";
import { Provider } from "react-redux";
import Store from "./utils/store";
import DrawerNavigator from "./components/routes";

const App = () => {
  return (
    <Provider store={Store}>
      <DrawerNavigator />
    </Provider>
  );
};

export default App;
