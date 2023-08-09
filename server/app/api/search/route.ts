import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

// Initialize the OpenAI API
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// GET /api/search
export const GET = async (req: Request) => {
	const { searchParams } = new URL(req.url);

	// If the query parameter is not present, return an empty array
	if (!searchParams.has("query")) {
		return [];
	}

	// Create a chat completion using the GPT-3.5-turbo model
	const recommendationResponse = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "user",
				content: `You are a gift recomendation service. You are given a description of a person, a maximum price, and type of relationship (ex. friend, spouse, family) and you have to recommend 5 gifts for them. Return properties are icon: string that is a valid font awesome 5 icon name from the expo-icons package (ex. "phone"), price: a string that includes a price range (ex. $5-20) and title: name of the product. The response should be in JSON, and in the format: [{ "title": "string", "price": "string", "icon": "string" }]. The prompt is: Person description: ${searchParams.get(
					"query"
				)}. Maximum price: $${searchParams.get("price") ?? 50}. ${
					searchParams.get("relationship") ?? "friend"
				}. Recommend 5 gifts:"}`,
			},
		],
	});

	// Return the first choice from the response
	return NextResponse.json(
		JSON.parse(recommendationResponse.data.choices[0].message?.content ?? "[]")
	);
};
