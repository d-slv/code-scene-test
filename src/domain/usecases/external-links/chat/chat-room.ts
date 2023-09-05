export type GetChatParams = {
	roomType: string;
	nmUsuario: string;
};

export type GetChatModel = {url: string};

export interface GetChatRoom {
	get: (params: GetChatParams) => Promise<GetChatModel>;
}
