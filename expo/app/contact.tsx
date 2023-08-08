import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
	return (
		<SafeAreaView className="flex flex-1 pt-8" edges={["bottom", "left", "right"]}>
			<Text>Page</Text>
		</SafeAreaView>
	);
};

export default Page;
