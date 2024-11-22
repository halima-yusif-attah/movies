"use client";

import { createContext, ReactNode, useEffect, useState } from "react";


export const MovieData = createContext(undefined);

const MovieProvider = ({ children }) => {
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);
const [error, setError] = useState(null);

     useEffect(() => {
       const fetchData = async () => {
         setLoading(true);
         const apiKey = "4b0a1242b6517969e0716f2b60796018";
         const url = `https://api.themoviedb.org/3/movie/${apiKey}?language=en-US`;
         const options = {method: 'GET', headers: {accept: 'application/json'}};
         const fUrl = `https://api.themoviedb.org/3/movie/11?api_key=${apiKey}&append_to_response=recommendations,release_dates,reviews,keywords,image,alternative_titles,plot_summary,casts,crew`
         const sUrl = `https://api.themoviedb.org/3/search/movie?query=Stars+Wars&api_key=${apiKey}`             
         
         try {
           const response = await fetch(sUrl);
           if (!response.ok) {
             throw new Error("Failed to fetch movies");
           }

           const data = await response.json();
           console.log("data", data.results);

           setData(data.results);
         } catch (error) {
           setError(error.message);
         } finally {
           setLoading(false);
         }
       };
       fetchData();
     }, []);
    
   

    const value = {
        data,
        loading,
        error
    }

    return (
        <MovieData.Provider value={value}>
            {children}
        </MovieData.Provider>
    )
};

export default MovieProvider;




