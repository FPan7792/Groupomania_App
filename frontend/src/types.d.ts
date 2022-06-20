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
