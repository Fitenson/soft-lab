import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { Provider } from 'react-redux';
import { store } from '@/core/presentation/store/index';
import { resolvePageComponent } from './utils/resolvePageComponent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from '@/components/ui/sonner';
import './index.css';
import { ThemeProvider } from '@/components/ui/theme/ThemeProvider';


const queryClient = new QueryClient();
const pages = import.meta.glob('./pages/**/*.tsx');


createInertiaApp({
    title: () => 'Soft Lab',
    resolve: (name) => {
        console.log('Inertia page name: ', name);
        const path = `./pages/${name}.tsx`;
        if(!pages[path]) {
            console.log('Inertia page not found: ', path);
        }

        return resolvePageComponent(`./pages/${name}.tsx`, pages)
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ThemeProvider defaultTheme='dark' storageKey='softlab-theme'>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <App {...props} />
                        <Toaster/>
                    </QueryClientProvider>
                </Provider>
            </ThemeProvider>
        )
    }
});
