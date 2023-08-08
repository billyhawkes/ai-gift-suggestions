import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

console.log("KEY", process.env.OPENAI_API_KEY);

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url);

	// If the query parameter is not present, return an empty array
	if (!searchParams.has("query")) {
		return [];
	}

	const recommendationResponse = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `You are a gift recomendation service. You are given a description of a person and a maximum price, and you have to recommend 5 gifts for them. Return properties are icon: string that is a valid font awesome 5 icon name from the expo-icons package (ex. "phone"), price: a string that includes a price range (ex. $5-20) and title: name of the product. The response should be in JSON, and in the format: [{ "title": "string", "price": "string", "icon": "string" }]. The prompt is: Person description: ${searchParams.get(
			"query"
		)}. Maximum price: $${searchParams.get("price") ?? 50}`,
		temperature: 0.6,
		max_tokens: 1000,
	});

	console.log(recommendationResponse.data.choices[0].text);

	return NextResponse.json(JSON.parse(recommendationResponse.data.choices[0].text ?? "[]"));
};
