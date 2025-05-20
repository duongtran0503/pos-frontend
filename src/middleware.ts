import { NextRequest, NextResponse } from 'next/server';
const pathPrivate: string[] = ['/manager-order'];

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value;

    if (pathPrivate.some((path) => pathname.startsWith(path)) && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (pathname.startsWith('/login') && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matches: ['/manager-order', 'login'],
};
