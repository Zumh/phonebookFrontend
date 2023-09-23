import axios from 'axios'
//const baseUrl = 'http://localhost:3001/records'
const baseUrl = '/api/persons';
//const baseUrl = '/api/people';
// get all the data from json server
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data);
}

// here we going to add phone number in phone records  using post request
const create = (newObject) => {
    const request = axios.post(baseUrl, newObject); 
    return request.then(response => response.data);
}



// update the data by deleting specific phone number record
const deleteRecord = (id) => {

    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

// update a new phone number with the same id using put request
const update = (id, newPhoneNumber) => {
    const request = axios.put(`${baseUrl}/${id}`, newPhoneNumber);
    return request.then(response => response.data);
}


export default {getAll, create, deleteRecord, update};
