// types
type Props = {
	setEstConnecte: React.Dispatch<
		React.SetStateAction<{
			connexion: boolean;
			token: string | null;
			userId: string | number | null;
			username: string | null;
			isAdmin: boolean | null;
		}>
	>;
};
// notification pop
import { activeNotif } from "../Fonctions";
// gestion auth
import Cookies from "js-cookie";
// composants css & icones
import {
	Flex,
	Button,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

// fonction réutilisables
function deconnexion(
	setState: React.Dispatch<
		React.SetStateAction<{
			connexion: boolean;
			token: string | null;
			userId: string | number | null;
			username: string | null;
			isAdmin: boolean | null;
		}>
	>,
	notyfColor: string
) {
	{
		Cookies.remove("token");
		Cookies.remove("userId");
		Cookies.remove("username");
		Cookies.remove("admin");
		if (
			!Cookies.get("token") &&
			!Cookies.get("userId") &&
			!Cookies.get("username")
		) {
			setState({
				connexion: false,
				token: null,
				userId: null,
				username: null,
				isAdmin: null,
			});

			activeNotif("Vous êtes bien déconnecté", true, notyfColor);
		}
	}
}

export const Header = (Props: Props) => {
	const { setEstConnecte } = Props;

	const { colorMode } = useColorMode();
	const color = useColorModeValue("primaire", "secondaire");

	return (
		<Flex justify="space-between" align="center" w="95%" m="40px auto 30px ">
			<svg
				height="40"
				viewBox="0 0 485 78"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill={colorMode === "light" ? "black" : " whitesmoke"}
					d="m5.41 12.67q-2.18 0-3.65-1.47-1.47-1.47-1.47-3.67 0-2.16 1.47-3.64 1.47-1.47 3.65-1.47 2.19 0 3.76 1.37l-1.36 1.49q-1.05-.82-2.4-.82-1.38.01-2.23.87-.84.85-.84 2.18 0 1.43.85 2.27.85.84 2.23.84 1.11 0 1.7-.43v-1.76l-1.36.01v-1.92h3.41v4.79q-1.56 1.36-3.76 1.36zm7.43-6.84v.76q.74-.75 1.79-.75.33 0 .63.05l-.3 1.89q-.33-.3-.95-.32-.7.05-1.17 1.01v4.2h-1.91v-6.63zm6.77 6.91q-1.49 0-2.49-1-.99-1-.99-2.48 0-1.49.99-2.49 1-1 2.49-1 1.49 0 2.49 1 1 1 1 2.49 0 1.49-1 2.48-1 1-2.49 1zm0-1.65q.77 0 1.26-.53.49-.52.49-1.3 0-.78-.49-1.3-.49-.53-1.27-.53-.77 0-1.26.53-.48.52-.48 1.3 0 .78.48 1.3.49.53 1.27.53zm8.91-.84v-4.42h1.91v6.84h-1.91v-.62q-.69.62-1.64.62-1.3 0-1.98-.79-.69-.79-.69-1.81v-4.24h1.92v3.76q0 .68.34 1.06.34.38 1.03.4.6-.04 1.02-.8zm5.45 5.3-1.91-.01v-9.5l1.91-.21v.55q.77-.55 1.51-.55 1.57 0 2.49 1.03.93 1.02.93 2.39 0 1.37-.93 2.39-.92 1.03-2.49 1.03-1.03-.07-1.51-.56zm0-6.92v1.11q.14 1.15 1.44 1.35 1.64-.13 1.85-1.7-.07-1.92-1.85-1.99-1.3.21-1.44 1.23zm9.38 4.11q-1.49 0-2.48-1-1-1-1-2.48 0-1.49 1-2.49.99-1 2.48-1 1.49 0 2.49 1 1 1 1 2.49 0 1.49-1 2.48-1 1-2.49 1zm0-1.65q.78 0 1.26-.53.49-.52.49-1.3 0-.78-.49-1.3-.48-.53-1.27-.53-.77 0-1.26.53-.48.52-.48 1.3 0 .78.48 1.3.49.53 1.27.53zm6.68-2.79v4.37h-1.92v-6.63l1.92-.21v.61q.64-.6 1.64-.6 1.29 0 1.98.78.75-.78 2.25-.78 1.3 0 1.99.78.68.79.68 1.82v4.23h-1.91v-3.76q0-.68-.31-1.06-.31-.37-1-.39-.57.04-.98.75-.04.21-.04.43v4.03h-1.91v-3.76q0-.68-.31-1.06-.31-.37-1-.39-.63.04-1.08.84zm11.11-.48-.75-1.16q1.3-.82 3.01-.82 1.23 0 1.94.68.72.69.72 2.05v4.1h-1.91v-.54q-.84.54-1.51.54-1.36 0-2.05-.58-.68-.58-.68-1.6 0-.96.65-1.71.64-.75 2.08-.75.67 0 1.51.41v-.21q-.02-.75-1.1-.82-1.23 0-1.91.41zm3.01 2.8v-.77q-.27-.53-1.3-.53-1.23.14-1.3.96.07.81 1.3.88 1.03 0 1.3-.54zm5.54-2.29v4.34h-1.92v-6.63l1.92-.21v.62q.69-.61 1.64-.61 1.3 0 1.98.78.68.79.68 1.82v4.23h-1.91v-3.76q0-.68-.34-1.06-.35-.37-1.04-.39-.59.04-1.01.87zm7.82 4.34h-1.91v-6.84h1.91zm-1.98-8.47q0 .41.27.68.28.27.76.27.47 0 .75-.27.27-.27.27-.68 0-.41-.27-.69-.28-.28-.77-.28-.46 0-.74.28-.27.28-.27.69zm4.53 3.62-.75-1.16q1.3-.82 3.01-.82 1.23 0 1.95.68.71.69.71 2.05v4.1h-1.91v-.54q-.83.54-1.5.54-1.37 0-2.05-.58-.69-.58-.69-1.6 0-.96.65-1.71.64-.75 2.09-.75.66 0 1.5.41v-.21q-.01-.75-1.09-.82-1.23 0-1.92.41zm3.01 2.8v-.77q-.27-.53-1.3-.53-1.23.14-1.3.96.07.81 1.3.88 1.03 0 1.3-.54z"
					transform="matrix(4.5696877 0 0 4.5696877 96.32992 -2.231069)"
				/>
				<switch transform="matrix(.92888913 0 0 .92888913 183.177811 -199.524525)">
					<path
						fill="#ffd7d7"
						d="m-155 298.8c11.2 0 21.7-4.3 29.6-12.2s12.2-18.4 12.2-29.6-4.3-21.7-12.2-29.6-18.4-12.2-29.6-12.2-21.7 4.3-29.6 12.2-12.2 18.4-12.2 29.6 4.3 21.7 12.2 29.6 18.4 12.2 29.6 12.2zm2.4-7.1c-.8.1-1.6.1-2.4.1-1.1 0-2.2-.1-3.3-.2-3.6-5.6-6.3-11.6-7.9-17.9h17.7c.6 1.5 1.7 2.9 3 3.8-1.7 5-4.1 9.7-7.1 14.2zm9.5-2c1.9-3.5 3.4-7 4.6-10.7 2.9-.6 5.2-2.6 6.3-5.3h7.7c-4 7.3-10.7 13-18.6 16zm22.8-32.7c0 3.3-.5 6.5-1.3 9.6h-10.8c-.6-1.3-1.6-2.5-2.8-3.4.2-2.2.3-4.4.3-6.6 0-3.1-.2-6.2-.6-9.2h13.8c1 3 1.4 6.3 1.4 9.6zm-4.2-16.7h-12.2c-1.3-5.5-3.2-10.7-5.8-15.7 7.6 2.9 14 8.6 18 15.7zm-17.4 16.3c0 1.7-.1 3.4-.2 5.1-2.8.6-5.1 2.4-6.2 4.9h-19.3c-.4-3-.7-6.1-.7-9.1 0-1.9.1-3.8.3-5.7 2.6-.5 4.7-2.2 6-4.4h19.5c.4 3 .6 6.1.6 9.2zm-15.7-34.2c.9-.1 1.8-.1 2.6-.1 1 0 2 0 3 .1 3.6 5.6 6.3 11.6 7.9 17.9h-17.4c-.6-1.7-1.7-3.2-3.1-4.3 1.8-4.8 4.1-9.3 7-13.6zm-9.5 2c-1.7 3.2-3.2 6.6-4.4 10-3.1.6-5.6 2.9-6.6 5.8h-7.3c3.9-7.1 10.4-12.8 18.3-15.8zm-22.6 32.6c0-3.3.5-6.6 1.4-9.6h10.9c.6 1.1 1.5 2.1 2.5 2.9-.2 2.4-.4 4.8-.4 7.2 0 3.1.2 6.1.6 9.1h-13.6c-1-3.1-1.4-6.3-1.4-9.6zm16.2 16.6c1.3 5.4 3.2 10.7 5.8 15.7-7.6-3-13.9-8.6-17.8-15.7z"
					/>
				</switch>
			</svg>
			<Button
				size="xs"
				onClick={() =>
					deconnexion(
						setEstConnecte,
						colorMode === "light" ? "#4E5166" : "#FFD7D7"
					)
				}
				rightIcon={<FontAwesomeIcon icon={faDoorOpen} />}
				color={color}
				border="1px solid"
				borderColor={color}
				variant="outline"
			>
				Déconnexion
			</Button>
		</Flex>
	);
};
export default Header;
