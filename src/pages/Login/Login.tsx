import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonTitle,
} from "@ionic/react";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useHistory } from "react-router";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle } = useAuth();
  const history = useHistory();

  const handleLogin = async () => {
    try {
      await login(email, password);
      history.push("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      history.push("/home");
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonTitle>Login</IonTitle>
        <IonInput
          placeholder="Email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
        <IonInput
          type="password"
          placeholder="Password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />
        <IonButton onClick={handleLogin}>Login</IonButton>
        <IonButton onClick={handleGoogleLogin}>Login with Google</IonButton>
        <IonButton routerLink="/register">Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
