import { FontAwesome5 } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Recommendation } from "../lib/recommendations";
import { Text } from "./Text";

const RecommendationItem = ({ icon, title, price }: Recommendation) => {
	return (
		<TouchableOpacity
			className="p-4 bg-white rounded shadow w-full mb-4 flex flex-row items-center"
			onPress={() => Linking.openURL(`https://www.amazon.com/s?k=${title}`)}
		>
			<FontAwesome5 name={icon as any} size={24} color="black" />
			<View className="ml-4 flex-1">
				<Text className="text-lg" bold>
					{title}
				</Text>
				<Text className="mt-1 text-slate-500">{price}</Text>
			</View>
			<FontAwesome5 name="chevron-right" size={20} color="black" />
		</TouchableOpacity>
	);
};

export default RecommendationItem;
