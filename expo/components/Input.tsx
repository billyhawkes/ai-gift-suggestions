import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View, ViewStyle } from "react-native";

type Props = {
	value: string;
	onChangeText: (text: string) => void;
	onSubmitEditing: () => void;
	placeholder: string;
	icon: string;
	className?: string;
	style?: ViewStyle;
	small?: boolean;
};

const Input = ({
	value,
	onChangeText,
	onSubmitEditing,
	placeholder,
	icon,
	style,
	small,
}: Props) => {
	return (
		<View
			className="bg-white shadow flex flex-row justify-start items-center rounded"
			style={style}
		>
			<View className="pl-3">
				<MaterialCommunityIcons name={icon as any} size={24} color="#121212" />
			</View>
			<TextInput
				className={`${small ? "p-3 pl-2" : "p-4 pl-3"}`}
				value={value}
				onChangeText={onChangeText}
				onSubmitEditing={onSubmitEditing}
				placeholder={placeholder}
				placeholderTextColor="rgb(148 163 184)"
			/>
		</View>
	);
};

export default Input;
