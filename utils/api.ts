import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STAR_WARS_API,
});
