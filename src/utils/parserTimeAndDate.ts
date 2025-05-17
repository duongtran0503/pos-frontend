import dayjs from 'dayjs';

export default function parseDateTime(isoString: string): {
    date: string;
    time: string;
} {
    const date = dayjs(isoString).format('DD/MM/YYYY');
    const time = dayjs(isoString).format('HH:mm:ss');
    return { date, time };
}
export function isWithinHours(isoString: string, hours: number): boolean {
    const now = new Date();
    const time = new Date(isoString);
    const diffInMs = Math.abs(now.getTime() - time.getTime());
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours < hours;
}
