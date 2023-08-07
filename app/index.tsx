import { Field, Form } from "houseform";
import React from "react";
import { Alert, TextInput, View } from "react-native";
import { z } from "zod";
import { Text } from "../components/Text";
import HomeImage from "./HomeImage";

const Page = () => {
	return (
		<View className="flex flex-1 pt-8">
			<View className="justify-center flex-row">
				<HomeImage />
			</View>
			<View className="mt-8 flex items-start flex-1 p-4">
				<Text className="text-2xl" bold>
					Search
				</Text>
				<Form
					onSubmit={(values) => {
						Alert.alert("Form was submitted with: " + JSON.stringify(values));
					}}
				>
					{({ isValid, submit }) => (
						<View className="w-full">
							<Field
								name="email"
								onBlurValidate={z.string().email("This must be an email")}
							>
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
		</View>
	);
};

export default Page;
