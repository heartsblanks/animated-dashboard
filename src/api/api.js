// src/api/api.js
import axios from 'axios';

// Fetch all PAP entries
export const fetchPAPs = () => axios.get('/api/paps');

// Fetch data for a specific PAP
export const fetchPAPData = (pap) => axios.get(`/api/data/${pap}`);