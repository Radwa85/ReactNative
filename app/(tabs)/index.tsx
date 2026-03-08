import { SafeAreaProvider } from "react-native-safe-area-context";
import SignUp from "../screens/SignUp";

export default function HomeScreen() {
  return(
    <SafeAreaProvider><SignUp />;</SafeAreaProvider>
  ) 
}