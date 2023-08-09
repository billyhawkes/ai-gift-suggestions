import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Field, Form } from "houseform";
import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import Input from "../components/Input";
import { Text } from "../components/Text";
import { getContacts } from "../lib/contacts";
import HomeImage from "./HomeImage";

const Page = () => {
	const router = useRouter();
	const { data: contacts } = useQuery(["contacts"], getContacts);

	return (
		<SafeAreaView className="flex flex-1 bg-slate-100" edges={["bottom", "left", "right"]}>
			<View className="justify-center flex-row pt-8">
				<HomeImage />
			</View>
			<View className="mt-8 flex items-start p-4">
				<Text className="text-2xl mb-4" bold>
					Search
				</Text>
				<Form<{ query: string }>
					onSubmit={(values) => {
						router.push({ pathname: "/search", params: { query: values.query } });
					}}
				>
					{({ submit }) => (
						<View className="w-full">
							<Field name="query" onBlurValidate={z.string().min(1)}>
								{({ value, setValue }) => {
									return (
										<Input
											value={value}
											onChangeText={setValue}
											onSubmitEditing={submit}
											placeholder="Interests, hobbies, etc."
											icon="basketball"
										/>
									);
								}}
							</Field>
						</View>
					)}
				</Form>
			</View>
			<View className="flex items-start flex-1 p-4">
				<View className="flex flex-row items-center justify-between w-full">
					<Text className="text-2xl" bold>
						Contacts
					</Text>
					<Pressable
						onPress={() =>
							router.push({ pathname: "/contact/[id]", params: { id: "new" } })
						}
						className="p-2"
					>
						<MaterialCommunityIcons name="account-plus" size={24} color="black" />
					</Pressable>
				</View>
				<FlatList
					data={contacts}
					className="w-full"
					contentContainerStyle={{
						flexGrow: 1,
					}}
					ListEmptyComponent={() => (
						<Text className="text-slate-500 my-10">No contacts found...</Text>
					)}
					renderItem={({ item }) => (
						<Pressable
							onPress={() =>
								router.push({ pathname: "/contact/[id]", params: { id: item.id } })
							}
							key={item.id}
							className="bg-white rounded shadow p-4 w-full mt-4 flex-row items-center"
						>
							<MaterialCommunityIcons name="account" size={24} color="black" />
							<Text className="ml-2">{item.name ? item.name : "New Contact"}</Text>
						</Pressable>
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Page;
