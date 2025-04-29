import axios from "../custom-axios/axios.js";

const faqService = {
    getAnswer: async (question) => {
        return axios.post("/faq/ask", question, {
            headers: {
                "Content-Type": "application/json",
            }
        })
    },
    getRandomFAQs: async () => {
        return axios.get("/faq/random")
    }
}

export default faqService