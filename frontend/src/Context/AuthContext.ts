import { createContext } from "react";

type ContextConnexion = {
	estConnecte: {
		connexion: boolean;
		token: string | null;
	};
	setEstConnecte: React.Dispatch<any>;
};

const etatDeConnexion: ContextConnexion = {
	estConnecte: {
		connexion: false,
		token: null,
	},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setEstConnecte: () => {},
};

export const AuthContext = createContext(etatDeConnexion);
