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
        return http.get("/leitura?gado_id=${data}");
    }

    getLeitura(id) {
        return http.get(`/leitura/${id}`);
    }

    createLeitura(data) {
        return http.post("/leitura", data);
    }

    updateLeitura(id, data) {
        return http.put(`/leitura/${id}`, data);
    }

    deleteLeitura(id) {
        return http.delete(`/leitura/${id}`);
    }

}

export default new DataService();