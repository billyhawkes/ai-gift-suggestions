import { render, screen } from "@testing-library/react-native";
import React from "react";

import Input from "./Input";

test("<Input />", () => {
	render(
		<Input
			icon="phone"
			value=""
			onChangeText={() => {}}
			onSubmitEditing={() => {}}
			placeholder="test placeholder"
		/>
	);
	screen.getByPlaceholderText("test placeholder");
});
