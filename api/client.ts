import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

export const githubApiClient = axios.create({
    baseURL: GITHUB_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
    },
});

githubApiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Github API Error:', error?.response?.data || error.message);
        return Promise.reject(error);
    }
);
