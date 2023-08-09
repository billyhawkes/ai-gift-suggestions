import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import RecommendationItem from "../components/RecommendationItem";
import { Text } from "../components/Text";
import { getRecommendations } from "../lib/recommendations";

const Page = () => {
	const { query } = useLocalSearchParams<{ query: string }>();
	const [price, setPrice] = useState<string>("");
	const queryClient = useQueryClient();

	const {
		data: recommendations,
		isLoading,
		refetch,
	} = useQuery(["search", query], () => getRecommendations(query as string), {
		enabled: !!query,
		cacheTime: 5 * 60 * 1000,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	return (
		<SafeAreaView className="flex flex-1 pt-8 bg-slate-100" edges={["bottom", "left", "right"]}>
			<View className="flex items-start flex-1 px-4">
				<View className="flex flex-row justify-between items-center w-full">
					<Text className="text-2xl" bold>
						Search
					</Text>
					<Input
						className="w-auto min-w-[120px]"
						icon="cash"
						value={price ?? ""}
						onChangeText={setPrice}
						onSubmitEditing={() => queryClient.resetQueries(["search"])}
						placeholder="Max Price"
						small
					/>
				</View>
				<Text className="text-lg text-slate-500 my-4">{query}</Text>
				{isLoading ? (
					<View className="flex-1 flex justify-center items-center w-full pb-20">
						<ActivityIndicator color="#121212" size="large" />
					</View>
				) : (
					<FlatList
						data={recommendations}
						className="w-full"
						renderItem={({ item, index }) => (
							<RecommendationItem key={index} {...item} />
						)}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

export default Page;
