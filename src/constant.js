export default {

  main_site: 'http://localhost:8080',
  web_local: 'http://localhost:8080',
  apiv1: 'http://localhost:5000/api',
  // apiv1_storage: 'http://localhost:5000/storage',
  api_full_url: window.location.origin,
  bearer_token: `?token=${localStorage.getItem('token')}`,
  headers: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
  headers_tokenless: {
      'Content-Type': 'application/json',
      'Accept' : 'application/json',
      'Access-Control-Allow-Origin': '*'
  },
  fetchEmployees : '/employee/getEmployees',
  deleteEmployee : '/employee/deleteEmployee',
  addEmployee: '/employee/createEmployee',
  updateEmployee: '/employee/updateEmployee'
  
}

 
