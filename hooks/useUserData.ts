import { useCallback, useEffect, useState } from 'react';
import { fetchGithubUserById as fetchUserById } from '../api/github';
import { UserData } from '../types/UserData';

export const useUSerData = (userId: string | number = '1', options?: { enabled?: boolean }) => {
    const isEnabled = options?.enabled ?? true;
    const [data, setData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(isEnabled);
    const [error, setError] = useState<string | null>(null);

    const loadUser = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const user = await fetchUserById(userId);
            setData(user);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (isEnabled) {
            loadUser();
        }
    }, [isEnabled, loadUser]);

    return { data, loading, error, refetch: loadUser };
};
