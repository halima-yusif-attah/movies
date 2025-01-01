"use client";

import { createContext, ReactNode, useEffect, useState } from "react";


export const MovieData = createContext(undefined);

const MovieProvider = ({ children }) => {
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);
const [error, setError] = useState(null);

     useEffect(() => {
      // const fetched = async () => {
      //   try {
      //     setLoading(true);
      //     const apiKey = "26e83gdeytf";

      //     const res = await fetch(`https://twitter.com/api_key=${apiKey}`)
      //     if (!res.ok) {
      //       throw new Error (`Could not fectch data`)
      //     }

      //     const data= res.json();
      //     setData(data);
      //   } catch (error) {
      //     setError(`Error fetching data`, error)
      //   } finally {
      //     setLoading(false);
      //   }
      // }

      // fetched();


       const fetchData = async () => {
         setLoading(true);
         const apiKey = "4b0a1242b6517969e0716f2b60796018";
         const url = `https://api.themoviedb.org/3/search/movie?query=Stars+Wars&api_key=${apiKey}`             
         
         try {
           const response = await fetch(url);
           if (!response.ok) {
             throw new Error("Failed to fetch movies");
           }

           const data = await response.json();
           console.log("data", data.results);
           setData(data.results);
           
         } catch (error) {
           setError(error);
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




