import axios from "axios";

const config = {
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${JSON.parse(localStorage.getItem("Authentication"))}`
	},
}

const signIn = async (data) => {
	return axios.post("http://localhost:8081/sign-in", data)
		.then((response) => {
			localStorage.setItem('Authentication', JSON.stringify(response.data.data));
			axios.defaults.headers.common['Authorization'] = response.data.data;
			return response
		})
}

const getProducts = async () => {
	return await axios.get("http://localhost:8081/products", config)
}

const createTimer = async (data) => {
	return await axios.post("http://localhost:8081/products/timers/add-timer", data, config)
}

const createSpeaker = async () => {
	return await axios.post("http://localhost:8081/products/timers/add-timer", config)
}

const createAmplifier = async () => {
	return await axios.post("http://localhost:8081/products/timers/add-timer", config)
}

const removeProduct = async (id) => {
	return await axios.delete(`http://localhost:8081/products/${id}`, config)
}

const getCategories = async () => {
	return await axios.get("http://localhost:8081/categories", config)
}

export {
	signIn,
	getProducts,
	getCategories,
	createTimer,
	createSpeaker,
	createAmplifier,
	removeProduct,
}