import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Field, Form } from "houseform";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/Input";
import RecommendationItem from "../../components/RecommendationItem";
import { Text } from "../../components/Text";
import {
	UpdateContact,
	createContact,
	deleteContact,
	getContact,
	updateContact,
} from "../../lib/contacts";
import { getRecommendations } from "../../lib/recommendations";

const Page = () => {
	const { id, price } = useLocalSearchParams<{ id: string; price?: string }>();
	const router = useRouter();
	const queryClient = useQueryClient();
	const updateContactMutation = useMutation({
		mutationFn: updateContact,
		onSuccess: () => {
			queryClient.invalidateQueries(["contact", id]);
			queryClient.invalidateQueries(["contacts"]);
		},
	});
	const deleteContactMutation = useMutation({
		mutationFn: deleteContact,
		onSuccess: () => {
			queryClient.invalidateQueries(["contacts"]);
			router.push({ pathname: "/" });
		},
	});

	useEffect(() => {
		if (id === "new") {
			createContact().then((contact) => {
				router.push({ pathname: "/contact/[id]", params: { id: contact.id } });
				queryClient.invalidateQueries(["contacts"]);
			});
		}
	}, [id]);

	const { data: contact } = useQuery(["contact", id], () => getContact(id as string), {
		enabled: !!id && id !== "new",
	});

	const { data: recommendations, isFetching } = useQuery(
		["search", contact?.interests, contact?.relationship, price],
		() =>
			getRecommendations({
				query: contact!.interests,
				relationship: contact!.relationship,
				price,
			}),
		{
			enabled: !!contact,
			cacheTime: 5 * 60 * 1000,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}
	);

	return (
		<SafeAreaView className="flex flex-1 bg-slate-100" edges={["bottom", "left", "right"]}>
			<Stack.Screen
				options={{
					headerTitle: `${contact?.name ? contact.name : "New Contact"}`,
					headerRight: () => (
						<>
							{id && id !== "new" ? (
								<Pressable
									onPress={() => {
										deleteContactMutation.mutate(id);
									}}
								>
									<MaterialCommunityIcons
										name="account-remove"
										size={24}
										color="#121212"
									/>
								</Pressable>
							) : null}
						</>
					),
				}}
			/>
			{contact ? (
				<>
					<Form<UpdateContact>
						onSubmit={(data) => {
							updateContactMutation.mutate({ id: contact.id, data });
						}}
					>
						{({ submit }) => (
							<View className="w-full p-4">
								<Field name="name" initialValue={contact.name}>
									{({ value, setValue }) => {
										return (
											<Input
												value={value}
												onChangeText={setValue}
												onSubmitEditing={submit}
												placeholder="Name"
												icon="alphabetical"
											/>
										);
									}}
								</Field>
								<Field name="interests" initialValue={contact.interests}>
									{({ value, setValue }) => {
										return (
											<Input
												className="mt-4"
												value={value}
												onChangeText={setValue}
												onSubmitEditing={submit}
												placeholder="Interests, hobbies, etc."
												icon="basketball"
											/>
										);
									}}
								</Field>
								<Field name="relationship" initialValue={contact.relationship}>
									{({ value, setValue }) => {
										return (
											<Input
												className="mt-4"
												value={value}
												onChangeText={setValue}
												onSubmitEditing={submit}
												placeholder="Friend, family, etc."
												icon="account"
											/>
										);
									}}
								</Field>
							</View>
						)}
					</Form>
					<View className="flex flex-row justify-between items-center w-full px-4 pt-4">
						<Text className="text-2xl" bold>
							Gift Ideas
						</Text>
						<Form<{ price: string }>
							onSubmit={({ price }) => router.setParams({ id: contact.id, price })}
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
					{isFetching ? (
						<View className="flex-1 flex justify-center items-center w-full pb-20">
							<ActivityIndicator color="#121212" size="large" />
						</View>
					) : (
						<FlatList
							data={recommendations}
							className="w-full p-4"
							renderItem={({ item, index }) => (
								<RecommendationItem key={index} {...item} />
							)}
						/>
					)}
				</>
			) : null}
		</SafeAreaView>
	);
};

export default Page;
