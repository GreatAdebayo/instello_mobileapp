import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic,
} from "@expo-google-fonts/open-sans";
import { AuthState } from "./contexts/auth/state";
import { AlertState } from "./contexts/alert/state";
import StackNavigator from "./navigation/StackNavigator";
import { GeneralState } from "./contexts/general/state";
import { PublicState } from "./contexts/dashboard/public/state";
import { PrivateState } from "./contexts/dashboard/private/state";

export default function App() {
  let [fontsLoaded] = useFonts({
    OpenSans_300Light,
    OpenSans_300Light_Italic,
    OpenSans_400Regular,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold,
    OpenSans_800ExtraBold_Italic,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <GeneralState>
        <AlertState>
          <AuthState>
            <PublicState>
              <PrivateState>
                <NavigationContainer>
                  <StackNavigator />
                </NavigationContainer>
              </PrivateState>
            </PublicState>
          </AuthState>
        </AlertState>
      </GeneralState>
    </SafeAreaProvider>
  );
}
