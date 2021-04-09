import axios from 'axios';
import { getToken } from '../Utils/helper';

const baseUrl = process.env.REACT_APP_API_URL;

const HandleError = (error) => {
    const { response } = error
    if (error && response) {
        throw response.data.errorMessage
    }
    throw error.message
}

const getConfig = (isTextPlainData) => {

    if (isTextPlainData) {
        return {
            'Content-Type': 'text/plain',
            'x-token': getToken()
        }
    }
    return {
        'x-token': getToken()
    }
}

export const publicGet = (url, params) => {
    return axios
        .get(baseUrl + url, { params })
        .then(res => res.data.data)
        .catch(err => HandleError(err))
}

export const publicPost = (url, payload) => {
    return axios
        .post(baseUrl + url, payload)
        .then(res => res.data.data)
        .catch(err => HandleError(err))
}

export const get = (url, params) => {
    return axios
        .get(baseUrl + url, { params, headers: { 'x-token': getToken() } })
        .then(res => res.data)
        .catch(err => HandleError(err))
}

export const post = (url, payload, isTextPlainData = false) => {
    return axios
        .post(baseUrl + url, payload, {
            headers: getConfig(isTextPlainData)
        })
        .then(res => res.data.data)
        .catch(err => HandleError(err))
}