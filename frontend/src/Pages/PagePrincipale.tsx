import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

// gestion authentification
import Cookies from "js-cookie";

// composants css
import { Button, Box } from "@chakra-ui/react";

// requetes
import { useFetch } from "../Hooks/hooks";

// composants jsx
import AccueilPostes from "../Composants/AccueilPostes";
import OngletsNavigation from "../Composants/OngletsNavigation";

export const PagePrincipale = () => {
	const { estConnecte, setEstConnecte } = useContext(AuthContext);

	const [ongletAffiché, setongletAffiché] = useState<
		"Accueil" | "Mes Posts" | "Likes"
	>("Accueil");

	const { isError, isLoading, isSuccess } = useFetch(
		"http://localhost:3003/posts"
	);
	const { datas } = isSuccess;

	// console.log("tou les postes", datas);
	// console.log("tou les errer", isError);

	return (
		<Box
			w="80%"
			h="80%"
			background="white"
			borderRadius="3xl"
			overflow="hidden"
		>
			<OngletsNavigation
				nomOnglet="Accueil"
				etat={ongletAffiché}
				setEtat={setongletAffiché}
			/>
			<OngletsNavigation
				nomOnglet="Mes Posts"
				etat={ongletAffiché}
				setEtat={setongletAffiché}
			/>
			<OngletsNavigation
				nomOnglet="Likes"
				etat={ongletAffiché}
				setEtat={setongletAffiché}
			/>
			<header>
				<Button
					onClick={() => {
						Cookies.remove("token");
						Cookies.remove("userId");
						if (!Cookies.get("token") && !Cookies.get("userId")) {
							setEstConnecte({
								connexion: false,
								token: null,
							});
						}
					}}
				>
					Deconnexion
				</Button>
				{/* <button
					onClick={() => {
						console.log(estConnecte);
					}}
				>
					affiche
				</button> */}
			</header>

			{ongletAffiché === "Accueil" && (
				<Box>
					{datas ? (
						<AccueilPostes posts={datas} userId={estConnecte.userId} />
					) : (
						isError && <p>{isError.message}</p>
					)}
				</Box>
			)}
		</Box>
	);
};
export default PagePrincipale;
