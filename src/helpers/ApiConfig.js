import axios from "axios";
import { Config } from "../config/Config";

const ApiConfig = axios.create({
    baseURL: Config.dev,
    header: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

///Intercept Request
///Intercept All Request 
ApiConfig.interceptors.request.use(
    async (request) => {
        const data = JSON.stringify(request.data);
        if (data) {
            console.log('request url : ', request.url, 'request plain : ', JSON.stringify(request.data));
        } else {
            console.log('request url : ', request.url, 'request no data');
        }

        return request;
    }, (error) => Promise.reject(error),
);
///Intercept Response
ApiConfig.interceptors.response.use(
    async (response) => {
        response.data = response.data;
        console.log('response data', response.data);
        return response;
    },
    (error) => {
        let result = { Status: 'E', Message: `Error : ${error.message}` };
        if (error.response != undefined) {
            switch (error.response.status) {
                case 400:
                    result = { Status: 'E', Message: 'Error : Bad Request.' };
                    break;
                case 401:
                    result = {
                        Status: 'E',
                        Message: 'Sesi Habis (Expired).',
                    };
                    break;
                case 403:
                    result = {
                        Status: 'E',
                        Message: 'Anda Tidak Punya Hak Akses.',
                    };
                    break;
                case 404:
                    result = {
                        Status: 'E',
                        Message: 'Error : Alamat Salah.',
                    };
                    break;
                case 500:
                    result = {
                        Status: 'E',
                        Message: 'Oh Tidak, Ada Kesalah pada Server.',
                    };
                case 502:
                    result = { Status: 'E', Message: 'Error : Bad Gateway.' };
                    break;
                case 503:
                    result = {
                        Status: 'E',
                        Message: 'Server sedang Update, Coba Sebentar Lagi.',
                    };
                    break;
                default:
                    result = { Status: 'E', Message: 'Whoops, Something Bad happen. :)' };
                    break;
            }
        }
        return Promise.reject(result);
    }
);

export default ApiConfig;