// axios configuracion
import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";

const url = ["http://localhost:8080/"];
const cookies = new Cookies();

const baseUrl = url[0];

const useAxiosConf = axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
	},
});

let token;

useAxiosConf.interceptors.request.use(
	(config) => {
		token = cookies.get("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export const useAxios = (options): [ any, Error, boolean, any] => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [data, setData] = useState();

	const trigger = () => {
    const token =  cookies.get("token")
		try {
			axios
				.request({
					baseURL: baseUrl,
					method: options.method,
					url: options.url,
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				})
				.then((request) => setData(request?.data));
      setLoading(false)
		} catch (error) {
      setLoading(false)
			setError(error)
		} finally {
      setLoading(false)
    }
	};

	return [data, error, loading, trigger];
};

export default useAxiosConf;
