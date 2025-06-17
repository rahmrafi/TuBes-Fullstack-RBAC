import axios from "axios";

const REACT_APP_BASE_URL = "http://localhost:2526/api";
const instance = axios.create({
    baseURL: REACT_APP_BASE_URL,
});

export const getUserCount = async () => {
  try {
    const response = await instance.get('/users/count');
    return response.data.totalUsers;
  } catch (error) {
    console.error('Gagal mengambil jumlah user:', error);
    return 0;
  }
};