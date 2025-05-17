export default function getDataFromLocalStorage(
    key: string
): object | string | null {
    const value = localStorage.getItem(key);
    const data = value ? JSON.parse(value) : null;
    return data;
}
