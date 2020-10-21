const axios = require("axios")

const axiosJS = {
  async getUser(userResponses) {
    try { let response = await axios.get(`https://api.github.com/users/${userResponses.Username}`);
        return response.data;

      } catch (error) {
        console.log(error);
      }
  }
};

module.exports = axiosJS;