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

const getUsers = async () => {
	return await axios.get("http://localhost:8081/user-list", config)
}

const createUser = async (data) => {
	return await axios.post("http://localhost:8081/register", data, config)
		.then(response => {
			return response
		})
}

const updateUser = async (id, data) => {
	return await axios.patch(`http://localhost:8081/user-list/${id}`, data, config)
	.then(response => {
		return response
	})
}

const changePass = async (data) => {
	return await axios.post("http://localhost:8081/user-list/change-password", data, config)
		.then(response => {
			return response
		})
}

const removeUser = async (id) => {
	return await axios.delete(`http://localhost:8081/user-list/${id}`, config)
}

const viewProfile = async () => {
	return await axios.get("http://localhost:8081/view-profile", config)
}

const getProductInHome = async () => {
	return await axios.get("http://localhost:8081/home/products")
}

const getProducts = async () => {
	return await axios.get("http://localhost:8081/products", config)
}

const getProduct = async (id) => {
	return await axios.get(`http://localhost:8081/products/${id}`)
}

const getProductByCategory = async (id) => {
	return await axios.get(`http://localhost:8081/products/products-category/${id}`, config)
}

const createTimer = async (data) => {
	return await axios.post("http://localhost:8081/products/timers/add-timer", data, config)
	.then(response => {
		return response
	})
}

const createSpeaker = async (data) => {
	return await axios.post("http://localhost:8081/products/speakers/add-speaker", data, config)
	.then(response => {
		return response
	})
}

const createAmplifier = async (data) => {
	return await axios.post("http://localhost:8081/products/amplifiers/add-amplifier", data, config)
	.then(response => {
		return response
	})
}

const updateTimer = async (id, data) => {
	return await axios.patch(`http://localhost:8081/products/timers/${id}`, data, config)
		.then(response => {
			return response
		})
}

const removeProduct = async (id) => {
	return await axios.delete(`http://localhost:8081/products/${id}`, config)
}

const searchProducts = async (search) => {
	return await axios.get(`http://localhost:8081/search-products?search=${search}`)
  }

const getCategories = async () => {
	return await axios.get("http://localhost:8081/categories", config)
}

const createCategory = async (data) => {
	return await axios.post("http://localhost:8081/categories/addcategory", data, config)
		.then(response => {
			return response
		})
}

const removeCategory = async (id) => {
	return await axios.delete(`http://localhost:8081/categories/${id}`, config)
}

const updateCategory = async (id, data) => {
	return await axios.patch(`http://localhost:8081/categories/${id}`, data, config)
		.then(response => {
			return response
		})
}

const getBrands = async () => {
	return await axios.get("http://localhost:8081/brands", config)
}

const createBrand = async (data) => {
	return await axios.post("http://localhost:8081/brands/add-brand", data, config)
		.then(response => {
			return response
		})
}

const removeBrand = async (id) => {
	return await axios.delete(`http://localhost:8081/brands/${id}`, config)
}

const updateBrand = async (id, data) => {
	return await axios.patch(`http://localhost:8081/brands/${id}`, data, config)
		.then(response => {
			return response
		})
}

const getNews = async () => {
	return await axios.get("http://localhost:8081/news", config)
}

const getNewsDetail = async (id) => {
	return await axios.get(`http://localhost:8081/news-detail/${id}`)
		.then(response => {
			return response
		})
}

const createNews = async (data) => {
	return await axios.post("http://localhost:8081/news/add-news", data, config)
		.then(response => {
			return response
		})
}

const removeNews = async (id) => {
	return await axios.delete(`http://localhost:8081/news/${id}`, config)
}

const updateNews = async (id, data) => {
	return await axios.patch(`http://localhost:8081/news/${id}`, data, config)
		.then(response => {
			return response
		})
}

const getContacts = async () => {
	return await axios.get("http://localhost:8081/contacts", config)
}

const createContact = async (data) => {
	return await axios.post("http://localhost:8081/contacts/add-contact", data, config)
		.then(response => {
			return response
		})
}

const removeContact = async (id) => {
	return await axios.delete(`http://localhost:8081/contacts/${id}`, config)
}

const updateContact = async (id, data) => {
	return await axios.patch(`http://localhost:8081/contacts/${id}`, data, config)
		.then(response => {
			return response
		})
}

const getCustomers = async () => {
	return await axios.get("http://localhost:8081/customers", config)
}

const createCustomer = async (data) => {
	return await axios.post("http://localhost:8081/customers/add-customer", data, config)
		.then(response => {
			return response
		})
}

const removeCustomer = async (id) => {
	return await axios.delete(`http://localhost:8081/customers/${id}`, config)
}

const updateCustomer = async (id, data) => {
	return await axios.patch(`http://localhost:8081/customers/${id}`, data, config)
		.then(response => {
			return response
		})
}

export {
	signIn,
	createUser,
	getUsers,
	updateUser,
	changePass,
	removeUser,
	viewProfile,
	getProducts,
	getProduct,
	getProductInHome,
	getProductByCategory,
	searchProducts,
	getCategories,
	createCategory,
	updateCategory,
	removeCategory,
	getBrands,
	createBrand,
	removeBrand,
	updateBrand,
	getNews,
	getNewsDetail,
	createNews,
	removeNews,
	updateNews,
	createTimer,
	createSpeaker,
	createAmplifier,
	updateTimer,
	removeProduct,
	getContacts,
	createContact,
	updateContact,
	removeContact,
	getCustomers,
	createCustomer,
	updateCustomer,
	removeCustomer
}