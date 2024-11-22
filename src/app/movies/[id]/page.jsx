'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

function DetailsPage({ params }) {
  const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);
const [_error, setError] = useState(null);

     useEffect(() => {
       const fetchData = async () => {
         const id = (await params).id;
         console.log("id", id);
         setLoading(true);
         const apiKey = "4b0a1242b6517969e0716f2b60796018";
         const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=trailers,casts,reviews,recommendations`
         try {
           const response = await fetch(url);
           if (!response.ok) {
             throw new Error("Failed to fetch movies");
           }

           const data = await response.json();
           console.log("data-details", data);

           setData(data);
         } catch (error) {
           setError(error.message);
         } finally {
           setLoading(false);
         }
       };
       fetchData();
     }, [params]);


  
  if (loading) {
    return <p className="text-white">loading...</p>
  }
  if (!data && !loading) {
    return <p className="text-white">data not found</p>
  }


  return (
  <div className="text-gray-300 p-4 text-lg">

      <h1 className="capitalize font-bold text-3xl text-center mb-4 text-teal-400">{data.title}</h1>
     
      <section className="section"> 
        <h2 className="h2">plot summary</h2>
        <p className=" tracking-wide ">{data.overview}</p> 
      </section>
      
      <section className="section"> 
      <ul>
        <h2 className="h2">casts:</h2>
        <div className="grid grid-cols-3 gap-4">
      {data.casts.cast.map((cast) => (
        <ol key={cast.cast_id}>{cast.name} - {cast.character}</ol>
      ))}
      </div>
      </ul>
      </section> 

      <section className="section">
      
        <h2 className="h2">crew:</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="">
          <h3 className="h3">names</h3>
          {data.casts.crew.map((c) => (
            <p key={c.credit_id} className="text-base">{c.name} </p>
          ))}
          </div>

          <div>
          <h3 className="h3">departments</h3>
          {data.casts.crew.map((c) => (
            <p key={c.credit_id}>{c.department} </p>
          ))}
        </div>

        <div>
          <h3 className="h3">jobs</h3>
          {data.casts.crew.map((c) => (
            <p key={c.credit_id}>{c.job} </p>
          ))}
        </div>
        </div>
      
      </section>
    
      <section className="section">
      <h2 className="h2">Reviews </h2>
      {data.reviews.results > 0 ? data.reviews.results.map((r,i) => (
        <p key={i} className="text-center">{r}</p>
      )) : <p className="text-center font-bold text-lg">No reviews available</p>  }
      </section>  

      <section className="section">
        <h2 className="h2">Ratings:</h2>
         <p className="text-center font-bold text-2xl"> {data.vote_average}</p>
      </section>
       
      <section className="section">
        <h2 className="h2">Trailers</h2>
      {data.trailers.youtube.length === 0? <p className="text-center font-bold text-lg">No trailers available.</p> : 
      <div className="flex items-center gap-4">
      {data.trailers.youtube.map((t,i) => 
          ( <iframe width={400} height={250} src={`https://www.youtube.com/embed/${t.source}`}  key={i} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowFullScreen className="b-0"></iframe>)     
      )}
      </div>
      }
      </section>
      <section className="section">
        <h2 className="h2">Similar Movies</h2>
        <div className="grid grid-cols-3 gap-4">
        {data.recommendations.results.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <p>{movie.title}</p>
          </Link>
        ))}
        </div>
      </section>
      
  
  </div>
)
}

export default DetailsPage;


