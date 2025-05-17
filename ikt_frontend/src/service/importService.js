import axios from "../custom-axios/axios.js";

const importService = {
    importFile: async (file) => {
        return axios.post("/import/file", file)
    }
}

export default importService