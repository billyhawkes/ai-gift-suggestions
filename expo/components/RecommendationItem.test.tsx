import { render, screen } from "@testing-library/react-native";
import React from "react";

import RecommendationItem from "./RecommendationItem";

test("<RecommendationItem />", () => {
	render(<RecommendationItem icon="phone" title="test title" price="test price" />);
	screen.getByText("test title");
	screen.getByText("test price");
});
