import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Field, Form } from "houseform";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import RecommendationItem from "../components/RecommendationItem";
import { Text } from "../components/Text";
import { getRecommendations } from "../lib/recommendations";

const Page = () => {
	const { query, price } = useLocalSearchParams<{ query: string; price?: string }>();
	const router = useRouter();

	const { data: recommendations, isLoading } = useQuery(
		["search", query, price],
		() =>
			getRecommendations({
				query: query!,
				price,
			}),
		{
			enabled: !!query,
			cacheTime: 5 * 60 * 1000,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);

	return (
		<SafeAreaView className="flex flex-1 pt-8 bg-slate-100" edges={["bottom", "left", "right"]}>
			<View className="flex items-start flex-1 px-4">
				<View className="flex flex-row justify-between items-center w-full mb-8">
					<Text className="flex-1 text-slate-500 mr-2" bold>
						{query}
					</Text>
					<Form<{ price: string }>
						onSubmit={({ price }) => router.setParams({ query: query!, price })}
					>
						{({ submit }) => (
							<Field name="price" initialValue={price ?? ""}>
								{({ value, setValue }) => {
									return (
										<Input
											className="w-auto min-w-[108px]"
											icon="cash"
											value={value}
											onChangeText={setValue}
											onSubmitEditing={submit}
											placeholder="Max ($)"
											small
										/>
									);
								}}
							</Field>
						)}
					</Form>
				</View>
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
