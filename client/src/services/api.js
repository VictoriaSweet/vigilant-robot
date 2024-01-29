const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://booking-com15.p.rapidapi.com/api/v1/meta/getLanguages',
  headers: {
    'X-RapidAPI-Key': 'c740526878mshc6c3d746e2f3003p19d0f3jsn8f869006c8ff',
    'X-RapidAPI-Host': 'booking-com15.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
export default axios.create({
  baseURL: 'http://localhost:3500'
});