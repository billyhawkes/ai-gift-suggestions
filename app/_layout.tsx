import { Inter_400Regular, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { Stack } from "expo-router";

const Layout = () => {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_600SemiBold,
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: "Home",
				}}
			/>
			<Stack.Screen name="contact" />
			<Stack.Screen name="search" />
		</Stack>
	);
};

export default Layout;
