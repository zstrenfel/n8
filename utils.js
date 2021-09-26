const axios = require('axios');

async function fetchWebpage(url) {
  try {
    response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  fetchWebpage: fetchWebpage,
};
