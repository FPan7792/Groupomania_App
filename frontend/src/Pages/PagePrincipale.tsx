import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

// types
import { POST } from "../types";

// gestion authentification
import Cookies from "js-cookie";
const TOKENACTIF = Cookies.get("token");

// composants css
import { Box, Text, Flex, useColorMode } from "@chakra-ui/react";

// composants jsx
import AccueilPostes from "../Composants/AccueilPostes";
import OngletsNavigation from "../Composants/OngletsNavigation";
import UtilisateurPosts from "../Composants/UtilisateurPosts";
import UtilisateurLikes from "../Composants/UtilisateurLikes";

const PagePrincipale = () => {
	const { estConnecte } = useContext(AuthContext);

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
				})
				.finally(() => setIsLoading(false));
		};

		fetchDatas();
	}, [refresh, isSuccess]);

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	useEffect(() => {}, [ongletAffiché]);

	if (refresh === 0 && isLoading) {
		return <Text>En cours de chargement ..</Text>;
	}

	const { colorMode } = useColorMode();

	return (
		<Flex align="center" flexDirection="column" w="100%" h="100% ">
			<Box
				pos="relative"
				w="95%"
				h="95%"
				margin="0 auto"
				background="white"
				borderRadius="3xl"
				overflow="hidden"
				bgColor={colorMode === "light" ? "#fdfdfd" : "tertiaire"}
			>
				<Flex>
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
				</Flex>

				{isSuccess && ongletAffiché === "Accueil" && (
					<Box>
						{datas ? (
							<AccueilPostes
								posts={datas}
								refresh={setRefresh}
								userId={estConnecte.userId}
								isAdmin={estConnecte.isAdmin}
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
						isAdmin={estConnecte.isAdmin}
					/>
				)}
				{ongletAffiché === "Likes" && (
					<UtilisateurLikes
						posts={datas}
						refresh={setRefresh}
						userId={estConnecte.userId}
						etat={ongletAffiché}
						isAdmin={estConnecte.isAdmin}
					/>
				)}
			</Box>
		</Flex>
	);
};
export default PagePrincipale;
