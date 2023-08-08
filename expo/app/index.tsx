import { useRouter } from "expo-router";
import { Field, Form } from "houseform";
import React from "react";
import { TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import { Text } from "../components/Text";
import HomeImage from "./HomeImage";

const Page = () => {
	const router = useRouter();

	return (
		<SafeAreaView className="flex flex-1 pt-8" edges={["bottom", "left", "right"]}>
			<View className="justify-center flex-row">
				<HomeImage />
			</View>
			<View className="mt-8 flex items-start flex-1 p-4">
				<Text className="text-2xl" bold>
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
								{({ value, setValue, onBlur, errors }) => {
									return (
										<View className="w-full">
											<TextInput
												className="bg-white rounded shadow p-4 w-full mt-4"
												value={value}
												onBlur={onBlur}
												onChangeText={(text) => setValue(text)}
												onSubmitEditing={submit}
												placeholder={"Interests, hobbies, likes"}
											/>
											{errors.map((error) => (
												<Text key={error}>{error}</Text>
											))}
										</View>
									);
								}}
							</Field>
						</View>
					)}
				</Form>
			</View>
		</SafeAreaView>
	);
};

export default Page;
