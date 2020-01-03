import Vue from "vue";
import axios from "axios";

const API_URL = "http://localhost:5001";
axios.defaults.baseURL = API_URL;

Vue.prototype.$axios = axios;
