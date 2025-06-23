import axios from 'axios';

const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

// create axios instance to make easy requests to giphy api
const GiphyAxios = axios.create({
  baseURL: 'https://api.giphy.com/v1',
  params: {
    // linter doesnt like "api_key" being lowercase and not capitalised so need to disable in order for giphy to accept the key
    // eslint-disable-next-line
    api_key: GIPHY_API_KEY,
  },
});

export default GiphyAxios;