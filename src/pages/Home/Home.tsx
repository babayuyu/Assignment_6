import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
} from "@ionic/react";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.replace("/login");
    }
  }, [user, history]);

  // Add this confirmation function
  const confirmLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end">
            {/* Update this button to use confirmLogout */}
            <IonButton onClick={confirmLogout}>Logout</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Welcome {user?.email}</h1>
        <p>You are successfully authenticated!</p>

        {/* Update this button too */}
        <IonButton expand="block" onClick={confirmLogout} color="danger">
          Sign Out
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
