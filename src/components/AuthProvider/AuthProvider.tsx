'use client';
import { store } from '@/lib/redux/store';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';


const AuthProvider = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <AppRouterCacheProvider>
            <Provider store={store}>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </Provider>
        </AppRouterCacheProvider>
    )
}

export default AuthProvider