"use client"

import { MovieData } from '@/context/MovieContext';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react'

function Page() {

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const context = useContext(MovieData);

  if (!context) {
    throw new Error("moviesData context is not available");
  }

  const { data: movies, loading } = context;

  console.log("movies", movies)

  const getImageUrl = (path, type= 'poster') => {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const size = type === 'poster' ? 'w500' : 'w780'; 
    return path ? `${baseUrl}${size}${path}` : '';
  };
   console.log("urls", getImageUrl());

   console.log(movies.release_dates.results)

   const renderGenres = () => {
     return movies.genres.map((genre) => genre.name).join(", ");
   };

   const renderProductionCompanies = () => {
     return movies.production_companies
       .map((company) => company.name)
       .join(", ");
   };

     const handleFilter = (e) => {
       const search = e.target.value.toLowerCase();
       setSearchTerm(search); 
       console.log(search);

    
       const filtered = movies?.filter(
         (item) =>
           item.title.toLowerCase().includes(search) ||
           item.description.toLowerCase().includes(search)
       );

       setFilteredData(filtered);
     };
 

  return (
    <div className="flex flex-col h-[100vh] bg-gray-900 w-full">
      {loading && <p>Loading...</p>}

      {}

      <div className=" bg-gray-500 p-4  h-[50px]  flex items-center justify-center">
        <input
          type="text"
          placeholder="Search"
          onChange={handleFilter}
          value={searchTerm}
          className="p-2 rounded-md w-[40%] "
        />
      </div>

      
          
      <div className="h-[calc(100vh-50px)] flex p-4">
        {filteredData.length > 0 ? (
           
        filteredData.map((movie, index) => (
          <div href="" className="w-[25%] bg-[white] flex flex-col rounded-md h-fit" key={movie}>
          <Image fill alt="" src="" />
          <div className="flex flex-col gap-2 text-sm">
            <p>titles</p>
            <p>realease date</p>
            <p>ratings</p>
          </div>
        </div>))
       ) : (
          <div>No data found</div>
        )}
        
       
      </div>

    </div>
  );
}

export default Page