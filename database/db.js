const axios = require('axios');

const data = JSON.stringify({
// data to add to database
});

const  = () => {
  // need endpoint specified
  axios.put(`http://localhost:9200/`, data, { headers: { 'Content-Type': 'application/json' } })
    .then((resp) => console.log('working, response:', resp)); 
};
