"use client";
import {createContext, useContext, useState} from 'react';

const SearchContext = createContext({
    searchTerm: ''
});

export function SearchProvider({ children } : {
    children: React.ReactNode;
}) {
    const [state, ] = useState({
        searchTerm: '',
    });

    return (
        <SearchContext.Provider value={state}>
            {children}
        </SearchContext.Provider>
    )
};

export function useSearchContext() {
    return useContext(SearchContext);
}

