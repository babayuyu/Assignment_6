import {
  IonApp,
  IonRouterOutlet,
  IonSpinner,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

// Add to your App.tsx or main.tsx
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

setupIonicReact();

const App: React.FC = () => {
  const { user, loading } = useAuth();

  // Debugging logs
  useEffect(() => {
    console.log("Auth state changed:", { user, loading });
  }, [user, loading]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <IonSpinner name="crescent" />
        <p>Loading authentication state...</p>
      </div>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            {!user ? <Login /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/register">
            {!user ? <Register /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/home">
            {user ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/">
            <Redirect to={user ? "/home" : "/login"} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
