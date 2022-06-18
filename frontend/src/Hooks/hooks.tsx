import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
	const [datas, setDatas] = useState<any>(null);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<null | Error>(null);

	useEffect(() => {
		const fetchDatas = async () => {
			setIsLoading(true);

			await fetch(url)
				.then((response) => {
					return response.json();
				})
				.then((datas) => {
					setDatas(() => datas);
					datas && setIsSuccess(true);
				})
				.catch((err) => {
					console.log(err);
					setIsError(err);
					return err;
				})
				.finally(() => setIsLoading(false));
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
