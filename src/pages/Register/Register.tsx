import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
} from "@ionic/react";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useHistory } from "react-router";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useAuth();
  const history = useHistory();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await register(email, password);
      history.push("/home");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonTitle>Register</IonTitle>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirm Password</IonLabel>
          <IonInput
            type="password"
            value={confirmPassword}
            onIonChange={(e) => setConfirmPassword(e.detail.value!)}
          />
        </IonItem>
        <IonButton expand="block" onClick={handleRegister}>
          Register
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
          Already have an account? Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
