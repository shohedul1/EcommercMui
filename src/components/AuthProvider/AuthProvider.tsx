'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { SessionProvider } from 'next-auth/react';


const AuthProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <AppRouterCacheProvider>
            <SessionProvider>
            {children}
            </SessionProvider>
           </AppRouterCacheProvider>
    )
}

export default AuthProvider