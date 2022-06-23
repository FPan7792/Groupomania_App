type Props = {
	nomOnglet: "Accueil" | "Mes Posts" | "Likes" | null;
	etat: "Accueil" | "Mes Posts" | "Likes" | null;
	setEtat: React.Dispatch<
		React.SetStateAction<"Accueil" | "Mes Posts" | "Likes" | null>
	>;
};

const OngletsNavigation = (Props: Props) => {
	const { nomOnglet, etat, setEtat } = Props;

	return (
		<button
			style={{
				width: "33%",
				// flex: 1,
				backgroundColor: `${etat === nomOnglet ? "red" : "white"}`,
			}}
			onClick={() => setEtat(nomOnglet)}
		>
			{nomOnglet}
		</button>
	);
};
export default OngletsNavigation;
