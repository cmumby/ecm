import axios from 'axios';

export default class TodoService {

  all(callback) {
    axios.get('http://localhost:6200/todo')
    .then((response) => {
      callback(response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback(null);
    });
  }

  get(id,callback) {
    axios.get('http://localhost:6200/ecm/'+id)
    .then((response) => {
      callback(response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback(null);
    });
  }

  add(data,callback) {
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

  update(data, id, callback){
    axios.post('http://localhost:6200/ecm/update/'+id, {
      desc: data
    })
    .then(function(response) {
      console.log('Updated');
      callback();
    })
    .catch(function(response) {
      callback();
    });
  }

  delete(id, callback){
    axios.get('http://localhost:6200/ecm/delete/'+id)
    .then(function(response){
      callback();
    })
    .catch(function(response){
      console.log('Error deleting');
      callback();
    });
  }
}
