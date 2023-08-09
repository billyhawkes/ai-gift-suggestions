import { z } from "zod";

export const RecommendationSchema = z.object({
	title: z.string(),
	price: z.string(),
	icon: z.string(),
});
export type Recommendation = z.infer<typeof RecommendationSchema>;

export const getRecommendations = async (query: string) => {
	const res = await fetch(`http://localhost:3000/api/search?query=${query}`);
	const json = await res.json();
	return RecommendationSchema.array().parse(json);
};
