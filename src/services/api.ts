import axios, {AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
  baseURL: 'http://172.26.7.9:3001',
});

api.interceptors.request.use(
  async (config): Promise<AxiosRequestConfig | any> => {
    try {
      const token = await AsyncStorage.getItem('@SPP:token');
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.log(error);
    }
  },
);

export default api;
