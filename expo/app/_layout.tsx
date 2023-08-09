import { Inter_400Regular, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "react-native-get-random-values";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient();

const Layout = () => {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_600SemiBold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<QueryClientProvider client={queryClient}>
				<Stack>
					<Stack.Screen
						name="index"
						options={{
							headerTitle: "Home",
						}}
					/>
					<Stack.Screen name="contact/[id]" />
					<Stack.Screen name="search" />
				</Stack>
			</QueryClientProvider>
		</SafeAreaProvider>
	);
};

export default Layout;
