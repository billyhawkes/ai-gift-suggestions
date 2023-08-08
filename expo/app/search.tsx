import { FontAwesome5 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../components/Text";

type Recommendation = {
	title: string;
	price: string;
	icon: string;
};

const getRecommendations = async (query: string) => {
	const res = await fetch(`http://localhost:3000/api/search?query=${query}`);
	const json = await res.json();
	console.log("query");
	return json as Recommendation[];
};

const Page = () => {
	const { query } = useLocalSearchParams<{ query: string }>();

	const { data: recommendations, isLoading } = useQuery(
		["search", query],
		() => getRecommendations(query as string),
		{
			enabled: !!query,
			cacheTime: 5 * 60 * 1000,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);

	return (
		<SafeAreaView className="flex flex-1 pt-8" edges={["bottom", "left", "right"]}>
			<View className="flex items-start flex-1 px-4">
				<Text className="text-2xl" bold>
					Search
				</Text>
				<Text className="text-lg text-slate-500 my-4">{query}</Text>
				<FlatList
					data={recommendations}
					className="w-full"
					renderItem={({ item, index }) => (
						<TouchableOpacity
							key={index}
							className="p-4 bg-white rounded shadow w-full mb-4 flex flex-row items-center"
							onPress={() =>
								Linking.openURL(`https://www.amazon.com/s?k=${item.title}`)
							}
						>
							<FontAwesome5 name={item.icon as any} size={24} color="black" />
							<View className="ml-4 flex-1">
								<Text className="text-lg" bold>
									{item.title}
								</Text>
								<Text className="mt-1 text-slate-500">{item.price}</Text>
							</View>
							<FontAwesome5 name="chevron-right" size={20} color="black" />
						</TouchableOpacity>
					)}
				/>
				{isLoading ? <ActivityIndicator /> : null}
			</View>
		</SafeAreaView>
	);
};

export default Page;
