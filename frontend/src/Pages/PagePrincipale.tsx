import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

// types
import { POST } from "../types";

// gestion authentification
import Cookies from "js-cookie";
const TOKENACTIF = Cookies.get("token");

// composants css
import { Button, Box } from "@chakra-ui/react";

// composants jsx
import AccueilPostes from "../Composants/AccueilPostes";
import OngletsNavigation from "../Composants/OngletsNavigation";
import UtilisateurPosts from "../Composants/UtilisateurPosts";
import { activeNotif } from "../Fonctions";

const PagePrincipale = () => {
	const { estConnecte, setEstConnecte } = useContext(AuthContext);

	const [refresh, setRefresh] = useState<number>(0);

	const [datas, setDatas] = useState<POST[] | null>(null);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<null | Error>(null);

	const [ongletAffiché, setOngletAffiché] = useState<
		"Accueil" | "Mes Posts" | "Likes" | null
	>("Accueil");

	useEffect(() => {
		const fetchDatas = async () => {
			setIsLoading(true);

			await fetch("http://localhost:3003/posts", {
				method: "GET",
				headers: {
					Authorization: "Bearer " + TOKENACTIF,
				},
			})
				.then(async (response) => {
					const resultat = await response.json();
					if (!response.ok) {
						throw new Error(resultat.message);
					}

					return resultat;
				})
				.then((datas) => {
					setDatas(() => datas);
					datas && setIsSuccess(true);
				})
				.catch((err) => {
					setIsError(err);
					return err;
				})
				.finally(() => setIsLoading(false));
		};

		fetchDatas();
	}, [refresh]);

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
				setEtat={setOngletAffiché}
			/>
			<OngletsNavigation
				nomOnglet="Mes Posts"
				etat={ongletAffiché}
				setEtat={setOngletAffiché}
			/>
			<OngletsNavigation
				nomOnglet="Likes"
				etat={ongletAffiché}
				setEtat={setOngletAffiché}
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

							activeNotif("Vous êtes bien déconnecté", true);
						}
					}}
				>
					Deconnexion
				</Button>
				{/* <button
						onClick={() => {
							setRefresh((prevState) => prevState + 1);
						}}
					>
						refresh
					</button> */}
			</header>

			{isSuccess && ongletAffiché === "Accueil" && (
				<Box>
					{datas ? (
						<AccueilPostes
							posts={datas}
							refresh={setRefresh}
							userId={estConnecte.userId}
						/>
					) : (
						isError && <p>{isError.message}</p>
					)}
				</Box>
			)}

			{ongletAffiché === "Mes Posts" && (
				<UtilisateurPosts
					posts={datas}
					refresh={setRefresh}
					userId={estConnecte.userId}
					etat={ongletAffiché}
				/>
			)}
		</Box>
	);
};
export default PagePrincipale;
