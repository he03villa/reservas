<script setup>

    import { ref } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useRouter } from 'vue-router';
    import { useReservaStore } from '../store/reservaStore';
    import { saveRerva, updateRerva } from '../helpers/getReserva';
    import { Alert } from '../helpers/services';

    const router = useRouter();
    const auxReserva = useReservaStore();
    const { reserva } = storeToRefs(auxReserva);

    const dataReserva = ref(reserva);

    const loading = ref(false);

    const valid = ref(false);
    const requiresRules = ref(
        [
            value => {
                if (value) return true
                return 'El campo es requerido.'
            }
        ]
    );

    const form = ref(null);

    const handleSubmit = async () => {
        const { valid  } = await form.value.validate();
        loading.value = true;
        calcularNumeroNoches();
        console.log(dataReserva.value);
        if (dataReserva.value.cantidad_noche <= 0) {
            loading.value = false;
            Alert('warning', '',"La fecha de llegada es mayor a la fecha de salida", 'Aceptar');
            return false;
        }

        if (!valid) {
            loading.value = false;
            return false;
        }

        const data = ({ ...dataReserva.value, fecha_llegada: formatFecha(dataReserva.value.fecha_llegada.toISOString()), fecha_salida: formatFecha(dataReserva.value.fecha_salida.toISOString()) });
        console.log(data);

        if (dataReserva.value.id == 0) {
            const res = await saveRerva(data);
            await Alert('success', '',"La reserva se creo", 'Aceptar');
        } else {
            const res = await updateRerva(data, dataReserva.value.id);
            await Alert('success', '',"La reserva se actualizo", 'Aceptar');
        }
        loading.value = false;
        router.push('/');
    }

    const calcularNumeroNoches = () => {
        if (dataReserva.value.fecha_llegada != '' && dataReserva.value.fecha_salida != '') {
            const fecha1 = new Date(dataReserva.value.fecha_llegada).getTime();
            const fecha2 = new Date(dataReserva.value.fecha_salida).getTime();
            const diferencia = fecha2 - fecha1;
            const dia = diferencia / (1000*60*60*24);
            console.log(dia);
            dataReserva.value.cantidad_noche = parseInt(dia);
        }
    }

    const formatFecha = (fecha) => {
        return fecha.split('T')[0];
    }
</script>
<template>
    <div class="container-formulario">
        <h1>Registro Reserva</h1>
        <v-form @submit.prevent="handleSubmit" ref="form">
            <v-container>
                <v-row>
                    <v-col cols="3">
                        <v-text-field
                            v-model="dataReserva.nombre"
                            :rules="requiresRules"
                            label="Nombre del huésped"
                            required
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            v-model="dataReserva.documento"
                            :rules="requiresRules"
                            label="Documento del huésped"
                            required
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            type="number"
                            v-model="dataReserva.numero_personas"
                            :rules="requiresRules"
                            label="Numero de personas"
                            required
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-text-field
                            type="number"
                            v-model="dataReserva.valor_reserva"
                            :rules="requiresRules"
                            label="Valor de la reserva"
                            required
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-date-picker
                            v-model="dataReserva.fecha_llegada"
                            :rules="requiresRules"
                            required
                            hide-details
                        ></v-date-picker>
                    </v-col>
                    <v-col cols="6">
                        <v-date-picker
                            v-model="dataReserva.fecha_salida"
                            :rules="requiresRules"
                            required
                            hide-details
                        ></v-date-picker>
                    </v-col>
                    
                </v-row>
            </v-container>
            <v-btn type="submit" :loading="loading" block class="mt-2">Enviar</v-btn>
        </v-form>
    </div>
</template>

<style scoped>
    .container-formulario {
        display: flex;
        justify-content: space-around;
        text-align: center;
        flex-direction: column;
        width: 80vw;
    }

    .container-formulario h1 {
        margin: 15px 0;
    }

    .container-formulario form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .container-formulario form .group-input {
        display: flex;
        flex-direction: column;
        width: 80%;
    }

    .container-formulario form .group-input div {
        border: 1px solid;
        border-radius: 25px;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: black;
    }

    .container-formulario form .group-input div input {
        width: 100%;
        border: none;
        font-size: 15px;
        font-weight: normal;
        outline: none;
    }

    .container-formulario form .group-input label {
        font-size: 20px;
        display: flex;
        align-items: baseline;
        color: blue;
        font-family: Arial, Helvetica, sans-serif;
    }

    .container-formulario form .group-input div input:focus-visible {
        outline: none;
    }

    .container-formulario form button {
        border: none;
        width: 80%;
        color: #FFFFFF;
        border-radius: 20px;
        font-size: 14px;
        font-weight: bold;
        margin: 15px 0;
        padding: 10px;
        background-color: green;
        cursor: pointer;
    }
</style>