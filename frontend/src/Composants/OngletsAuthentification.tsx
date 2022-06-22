type Props = {
	nomOnglet: "Connexion" | "Inscription";
	etat: "Connexion" | "Inscription";
	setEtat: React.Dispatch<React.SetStateAction<"Connexion" | "Inscription">>;
};

const OngletsAuthentification = (Props: Props) => {
	const { nomOnglet, etat, setEtat } = Props;

	return (
		<button
			style={{
				width: "50%",
				backgroundColor: `${etat === nomOnglet ? "red" : "white"}`,
			}}
			onClick={() => setEtat(nomOnglet)}
		>
			{nomOnglet}
		</button>
	);
};
export default OngletsAuthentification;
