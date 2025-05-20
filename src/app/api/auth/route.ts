import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();
        const cookieStore = await cookies();
        const expires = new Date(Date.now() + 2 * 3600 * 1000);
        cookieStore.set('token', token, {
            httpOnly: true,
            expires: expires,
            path: '/',
            sameSite: 'strict',
        });
        return NextResponse.json({ message: 'Đăng nhập thành công' });
    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json({ message: 'server error' }, { status: 500 });
    }
}
