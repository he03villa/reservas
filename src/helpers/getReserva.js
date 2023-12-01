import apiRserva from "../api/apiRserva";

const getAllReservas = async (id = '', fecha = '', nombre = '') => {
    const params = new URLSearchParams();
    if (id != '') {
        params.append('id', id);
    }
    if (fecha != '') {
        params.append('fecha', fecha);
    }
    if (nombre != '') {
        params.append('nombre', nombre);
    }
    /* console.log(params.toString()); */
    const res = await apiRserva.get(`/reserva`, { params });
    return res.data;
}

const updateStado = async (data, id)  => {
    const res = await apiRserva.put(`/reserva/estado_reserva/${id}`, data);
    return res.data;

}
const saveRerva = async (data)  => {
    const res = await apiRserva.post(`/reserva`, data);
    return res.data;
}

const updateRerva = async (data, id)  => {
    const res = await apiRserva.put(`/reserva/${id}`, data);
    return res.data;
}

export {
    getAllReservas,
    updateStado,
    saveRerva,
    updateRerva
}