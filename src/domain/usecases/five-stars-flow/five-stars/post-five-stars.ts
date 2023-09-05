export type PostFiveStarsParams = {
	items: {
		nota: number;
		tipo: string;
		email: string;
		comentario: string;
		motivadores: string;
		cdatendimento: string;
	}[];
};

export type PostFiveStarsModel = unknown;

export interface PostFiveStars {
	post: (params: PostFiveStarsParams) => Promise<PostFiveStarsModel>;
}
