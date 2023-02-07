const axios = require('axios')


async function getUser() {
    try {
      const response = await axios.get('http://127.0.0.1:5000/');
      console.log(response.data.books);
    } catch (error) {
      console.log(error);
    }
  }

  getUser()