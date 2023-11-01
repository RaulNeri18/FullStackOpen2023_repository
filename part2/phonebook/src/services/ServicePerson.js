import axios from 'axios'

const urlBase = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(urlBase).then(response => response.data)
}

const insertPerson = (newPerson) => {
    return axios.post(urlBase, newPerson).then(response => response.data)
}

const updatePerson = (id, newPerson) => {
    return axios.put(`${urlBase}/${id}`, newPerson).then(response => response.data)
}

const deletePerson = (id) => {
    //return axios.delete(`${urlBase}/${id}`).then(response => response.data)
    return axios.delete(`${urlBase}/${id}`).then(response => response.status)
}

export default { getAll, insertPerson, updatePerson, deletePerson }