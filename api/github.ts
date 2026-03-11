import { UserData } from '../types/UserData';
import { githubApiClient } from './client';


export const fetchGithubUserById = async (id: string | number = '1'): Promise<UserData> => {
    try {
        const response = await githubApiClient.get<UserData>(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch github user profile');
    }
};
