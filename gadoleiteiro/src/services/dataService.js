import http from "../http-common";

class DataService {
    getAllGados() {
        return http.get("/gados");
    }

    getGado(id) {
        return http.get(`/gados/${id}`);
    }

    createGado(data) {
        return http.post("/gados", data);
    }

    updateGado(id, data) {
        return http.put(`/gados/${id}`, data);
    }

    deleteGado(id) {
        return http.delete(`/gados/${id}`);
    }

    findGadoByNome(data) {
        return http.get(`/gados?nome=${data}`);
    }

    getAllLeituras(id) {
        return http.get(`/leituras?gado_id=${id}`);
    }

    getLeitura(id) {
        return http.get(`/leituras/${id}`);
    }

    createLeitura(data) {
        console.log(data);
        return http.post("/leituras", data);
    }

    updateLeitura(id, data) {
        return http.put(`/leituras/${id}`, data);
    }

    deleteLeitura(id) {
        return http.delete(`/leituras/${id}`);
    }

}

export default new DataService();