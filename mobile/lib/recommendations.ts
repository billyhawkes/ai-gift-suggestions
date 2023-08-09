import { z } from "zod";

export const RecommendationSchema = z.object({
	title: z.string(),
	price: z.string(),
	icon: z.string(),
});
export type Recommendation = z.infer<typeof RecommendationSchema>;

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
	return RecommendationSchema.array().parse(json);
};
