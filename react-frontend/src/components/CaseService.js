import axios from 'axios';

export default class CaseService {

    all(callback) {
        axios.get('http://localhost:6200/ecm/cases/list')
            .then((response) => {
                callback(response.data);
                // console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                callback(null);
            });
    }

    naics(callback) {
        axios.get('http://localhost:6200/ecm/naics/list')
            .then((response) => {
                callback(response.data);
                // console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                callback(null);
            });
    }

    get(id, callback) {
        axios.get('http://localhost:6200/ecm/' + id)
            .then((response) => {
                callback(response.data);
            })
            .catch(function (error) {
                console.log(error);
                callback(null);
            });
    }

    add(data, callback) {
        axios.post('http://localhost:6200/ecm/add/', {
            desc: data
        })
            .then(function (response) {
                console.log(response);
                callback();
            })
            .catch(function (error) {
                console.log(error);
                callback();
            });
    }

    update(data, id, callback) {
        axios.post('http://localhost:6200/ecm/update/' + id, {
            data: data
        })
            .then(function (response) {
                
                callback();
            })
            .catch(function (response) {
                callback();
            });
    }

    updateAttachments(data, id, callback) {
        axios.post(`http://localhost:6200/ecm/update/${id}/attachments`, {
            data: data
        })
            .then(function (response) {
                
                callback();
            })
            .catch(function (response) {
                callback();
            });
    }

    upload(data, callback) {
        const formData = new FormData();
        formData.append('file',data.selectedFile);
        formData.append('uploadType', data.uploadType);
        formData.append('uploadComment', data.uploadComment);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('http://localhost:6200/ecm/upload', formData, config )
            .then(function (response) {
                callback(response);
            })
            .catch(function (response) {
               // callback();
            });
    }

    delete(id, callback) {
        axios.get('http://localhost:6200/ecm/delete/' + id)
            .then(function (response) {
                callback();
            })
            .catch(function (response) {
                console.log('Error deleting');
                callback();
            });
    }
}
