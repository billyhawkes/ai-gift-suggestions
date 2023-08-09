import { z } from "zod";

// Recommendation schema
export const RecommendationSchema = z.object({
	title: z.string(),
	price: z.string(),
	icon: z.string(),
});
// Recommendation type
export type Recommendation = z.infer<typeof RecommendationSchema>;

// Gets recommendations from the server
export const getRecommendations = async ({
	query,
	relationship,
	price,
}: {
	query: string;
	relationship?: string;
	price?: string;
}) => {
	const res = await fetch(
		`https://ai-gift-suggestions.vercel.app/api/search?query=${query}&relationship=${relationship}&price=${
			price ?? "50"
		}`
	);
	const json = await res.json();
	// Validate the response
	return RecommendationSchema.array().parse(json);
};
