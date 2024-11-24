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
       console.log("search", search);
       setSearchTerm(search); 
       
       if (!search) {
        console.log('ss', !search)
        return setFilteredData([]);
       }
        
       const filtered = movies?.filter(
         (item) =>
           item.title.toLowerCase().startsWith(search) 
       );

       console.log("filtered-fxn", filtered);
       setFilteredData(filtered);
     };

    //  console.log("filteredData", filteredData);
 

  return (
    <div className="flex flex-col min-h-full  w-full">
      {loading && <p className='bg-gray-500'>Loading...</p>}

      {}

      <div className=" bg-gray-500 p-4 flex items-center justify-center fixed w-full z-10">
        <input
          type="text"
          placeholder="Search for movies by titles..."
          onChange={handleSearch}
          value={searchTerm}
          className="p-2 rounded-md w-[40%] "
        />
        {/* <button onClick={handleSearch}>submit</button> */}
      </div>

       {/* <div className='w-full flex justify-center bg-rose-500'> */}
        <h1 className='text-6xl capitalize text-teal-400 mb-4 mt-[8rem] text-center'>star war films collection</h1>
        {/* </div> */}
          
      <div className=" grid grid-cols-3 grid-rows-5 p-8 gap-x-4 gap-y-8 mt-8 z-0">
        {filteredData.length > 0 ? (
           
        filteredData.map((m) => (
          <Link href={`/movies/${m.id}`} key={m.id} className="bg-[gray] mt-[5rem] flex flex-col space-y-2 rounded-md text-white ">
            
            <div className="w-full h-[10rem] sm:h-[15rem] md:h-[20rem] bg-black relative">
              {m.poster_path ? 
              <Image fill alt={m.title} src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} className='rounded-t-md object-cover'/>
               : <h2 className="text-lg text-center">{m.title}</h2> }
              </div>
          <div className="flex flex-col gap-2 text-sm">
            {m.poster_path? <p>Title: {m.title}</p> : ""}
            <p>Release date: {m.release_date}</p>
            <p>Ratings: {m.vote_average}</p>
          </div>
          
        </Link>
        ))
       ) : (
          <div className='text-gray-300 text-lg absolute top-[50%] left-[50%]  -translate-x-[50%]'>Type in the movie title to search for movies</div>
        )}

      
        
        
       
      </div>

    </div>
  );
}

export default Page