import { Text as RNText, TextStyle } from "react-native";

type Props = {
	children: React.ReactNode;
	className?: string;
	style?: TextStyle;
	bold?: boolean;
};

export const Text = ({ children, style, bold }: Props) => {
	return (
		<RNText
			style={[
				{
					fontFamily: bold ? "Inter_600SemiBold" : "Inter_400Regular",
					color: "#121212",
				},
				style,
			]}
			className="text-base"
		>
			{children}
		</RNText>
	);
};
