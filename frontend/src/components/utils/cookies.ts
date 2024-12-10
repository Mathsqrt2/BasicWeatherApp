export const setCookie = (name: string, value: string, expirationDays: number): void => {
    const date = new Date();
    date.setDate(date.getDate() + expirationDays);
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${date.toUTCString()}`;
}

export const deleteCookie = (name: string): void => {
    document.cookie = `${decodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}

export const getCookie = (name: string): string => {
    const cookieValue: any = document.cookie.split('; ')
        .find(row => row.startsWith(`${encodeURIComponent(name)}`))?.split('=')[1];
    return decodeURIComponent(cookieValue) || '';
}