import { Text as RNText, TextStyle } from "react-native";

type Props = {
	children: React.ReactNode;
	className?: string;
	style?: TextStyle;
	bold?: boolean;
};

export const Text = ({ children, className, style, bold }: Props) => {
	return (
		<RNText
			style={[
				style,
				{
					fontFamily: bold ? "Inter_600SemiBold" : "Inter_400Regular",
				},
			]}
			className={className}
		>
			{children}
		</RNText>
	);
};
