import axios from "axios";

const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsIl9pZCI6IjY1MWJkYjI3OThiYjFlYzM5ZmVmMmY2YyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY5NjU4MTkzNCwiZXhwIjoxNjk2NjY4MzM0fQ.kH79pFiJ-wSrKNTmX2CD4-eL0A0bB68969EGugp7XUw"}`
    },
  }

	const getProducts = async () => {
		return await axios.get("http://localhost:8081/products")
	}
	
	const createTimer = async () => {
		return await axios.post("http://localhost:8081/products/timers/add-timer")
	}

	const createSpeaker = async () => {
		return await axios.post("http://localhost:8081/products/timers/add-timer")
	}

	const createAmplifier = async () => {
		return await axios.post("http://localhost:8081/products/timers/add-timer")
	}

	const getCategories = async () => {
		return await axios.get("http://localhost:8081/categories", config)
	}

	export {
		getProducts,
		getCategories,
		createTimer,
		createSpeaker,
		createAmplifier
	}