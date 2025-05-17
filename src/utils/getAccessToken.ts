import { localStorageName } from '@/constans/localStorage';

export default function getAccessToken(): string | null {
    if (typeof window === 'undefined') {
        return null;
    }
    const value = localStorage.getItem(localStorageName.ACCESS_TOKEN);
    const token = value ? JSON.parse(value) : null;
    return token;
}
