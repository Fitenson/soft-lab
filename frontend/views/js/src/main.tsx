import { createRoot } from 'react-dom/client';
import { createInertiaApp, router } from '@inertiajs/react';
import { Provider } from 'react-redux';
import {persistor, store} from '@/core/presentation/store/index';
import { resolvePageComponent } from './utils/resolvePageComponent';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from '@/components/ui/sonner';
import './index.css';
import { ThemeProvider } from '@/components/ui/theme/ThemeProvider';
import { TooltipProvider } from './components/ui/tooltip';
import {PersistGate} from "redux-persist/integration/react";


const queryClient = new QueryClient();
const pages = import.meta.glob('./pages/**/*.tsx');


createInertiaApp({
    title: () => 'Soft Lab',
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, pages),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <TooltipProvider>
                <ThemeProvider defaultTheme='dark' storageKey='softlab-theme'>
                    <Provider store={store}>
                        <PersistGate persistor={persistor} loading={<div>Loading...</div>} onBeforeLift={() => {
                            if(!store?.getState()?.auth?.auth) {
                                router.visit("/login");
                            }
                        }}>
                            <QueryClientProvider client={queryClient}>
                                <App {...props} />
                                <Toaster/>
                            </QueryClientProvider>
                        </PersistGate>
                    </Provider>
                </ThemeProvider>
            </TooltipProvider>
        )
    }
});
