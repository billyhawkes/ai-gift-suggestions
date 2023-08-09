import { render, screen } from "@testing-library/react-native";
import React from "react";

import { Text } from "./Text";

test("<Text />", () => {
	render(<Text>Hello</Text>);
	screen.getByText("Hello");
});
