import { useEffect, useState } from "react";

import Cookies from "js-cookie";
// token de session
const TOKENACTIF = Cookies.get("token");

export const useFetch = (url: string) => {
	const [datas, setDatas] = useState<any>(null);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<null | Error>(null);

	useEffect(() => {
		const fetchDatas = async () => {
			setIsLoading((isLoading) => true);

			await fetch(url, {
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
					datas && setIsSuccess((isSuccess) => true);
				})
				.catch((err) => {
					setIsError((isError) => err);
					return err;
				})
				.finally(() => setIsLoading((isLoading) => false));
		};

		fetchDatas();
	}, []);

	return {
		isSuccess: { isSuccess, datas },
		isError,
		isLoading,
	};
};

// PostDatas

// export const usePostDonnees = (url: string, form: FormData) => {
// 	const [datas, setDatas] = useState<any>(null);
// 	const [isSuccess, setIsSuccess] = useState<boolean>(false);
// 	const [isLoading, setIsLoading] = useState<boolean>(false);
// 	const [isError, setIsError] = useState<null | Error>(null);

// 	useEffect(() => {
// 		const postDatas = async () => {
// 			setIsLoading(true);

// 			await fetch(url, {
// 				method: "POST",
// 				body: form,
// 			})
// 				.then((datas) => {
// 					setDatas(() => datas);
// 					datas && setIsSuccess(true);
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 					setIsError(err);
// 					return err;
// 				})
// 				.finally(() => setIsLoading(false));
// 		};

// 		postDatas();
// 	}, []);

// 	return {
// 		isSuccess: { isSuccess, datas },
// 		isError,
// 		isLoading,
// 	};
// };
