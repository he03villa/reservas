import { defineStore } from "pinia";

export const useReservaStore = defineStore('reserva', {
    state: () => ({
        reserva: undefined
    }),
    actions: {
        getReserva(data) {
            this.reserva = data;
        }
    }
});