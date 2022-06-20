import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

import { Button } from "@chakra-ui/react";

import Cookies from "js-cookie";

export const PagePrincipale = () => {
	const { estConnecte, setEstConnecte } = useContext(AuthContext);

	return (
		<Button
			onClick={() => {
				Cookies.remove("token");
				if (!Cookies.get("token")) {
					setEstConnecte({
						connexion: false,
						token: null,
					});
				}
			}}
		>
			Deconnexion
		</Button>
	);
};
export default PagePrincipale;
