import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const UtilisateurPosts = () => {
	return (
		<Link to={"/post/nouveaupost"}>
			<Button>Nouvelle publication</Button>
		</Link>
	);
};
export default UtilisateurPosts;
