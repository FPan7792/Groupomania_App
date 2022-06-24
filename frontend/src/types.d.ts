// pour connexion et login
export type CONNEXIONUTILISATEUR = {
	userId: number;
	token: string;
};

export type CREATIONUTILISATEUR = {
	response: string;
	newUser?: any;
	// schema de reponse a definir
};

export type POST = {
	post_id: number;
	title: string;
	content: string;
	likes: number;
	usersIds_likes: string;
	createdAt: Date;
	image_url?: string;
	is_image: boolean;
	owner_id: number;
	updatedAt: Date;
	image?: any;
};
