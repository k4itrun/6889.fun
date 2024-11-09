import { PageContextType, PageProviderProps } from "@/interfaces";

import { useContext, createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const PageContext = createContext<PageContextType | undefined>(undefined);

export function usePage(): PageContextType {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error('usePage must be used within a PageProvider');
    }
    return context;
};

export function PageProvider({ children, value }: PageProviderProps) {
    const router = useRouter();

    function getPage() {
        if (router.pathname === '/_error') {
            return '/error';
        }
        return router.pathname;
    }

    const [page, setPage] = useState<string>(value || '/');

    useEffect(() => {
        setPage(getPage());
    }, [router]);

    return (
        <>
            <PageContext.Provider value={{ page }}>{children}</PageContext.Provider>
        </>
    );
};
