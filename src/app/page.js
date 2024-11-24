"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import { MovieData } from '../context/MovieContext';

function Page() {

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const context = useContext(MovieData);

  if (!context) {
    throw new Error("moviesData context is not available");
  }

  const { data: movies, loading } = context;

     const handleSearch = (e) => {
       const search = e.target.value.toLowerCase();
       setSearchTerm(search); 
       
       if (!search) {
        return setFilteredData([]);
       }
        
       const filtered = movies?.filter(
         (item) =>
           item.title.toLowerCase().startsWith(search) 
       );

       setFilteredData(filtered);
     };
 

  return (
    <div className="flex flex-col min-h-screen  w-full">
      {loading && <p className='bg-gray-500'>Loading...</p>}

      <nav className=" bg-gray-500 p-4 flex items-center justify-center fixed w-full z-10">
        <input
          type="text"
          placeholder="Search for movies by titles..."
          onChange={handleSearch}
          value={searchTerm}
          className="p-2 rounded-md md:w-[450px] bg-gray-50 "
        />
      </nav>

      

        <header>
        <h1 className='text-6xl capitalize text-teal-400 mb-4 mt-[8rem] text-center'>star war films collection</h1>
        </header>  

         {filteredData.length === 0 ?
           (
          <div className=''>
            <p className='text-gray-300 text-lg text-center'>
            Type in the movie title to search for movies
            </p>
          </div>

        )
        : 
        (
      <div className="grid-container">     
       { filteredData.map((m) => (
        <Link href={`/movies/${m.id}`} key={m.id} className="bg-[gray] flex flex-col space-y-2 rounded-md text-white ">
            <div className="w-full h-[10rem] sm:h-[15rem] md:h-[20rem] bg-black relative">
              <Image fill alt={m.title} src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} className='rounded-t-md object-cover'/> 
            </div>
          <div className="flex flex-col gap-2 text-sm p-2">
            <p>Title: {m.title}</p>
            <p>Release date: {m.release_date}</p>
            <p>Ratings: {m.vote_average}</p>
          </div>  
        </Link>
       ))}
      </div>
      )
    }
  </div>
  );
}

export default Page