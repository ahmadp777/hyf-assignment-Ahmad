import React, { useState, useEffect } from 'react';
import styles from './NasaCollaborationPage.module.css';

// Read "/app/nasa_collaboration/README.md" for more info about the API_KEY
// You need a proper API_KEY for the requests to work
const API_KEY = 't1GMLo0AmYGX87Ckvcnwcp0CGg2bvmXcSU5XhSol';

const NASA_URLs = {
  astronomyPicOfTheDay: `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`,
  marsRoverPhoto: `https://images-api.nasa.gov/search?q=mars+rover+curiosity&media_type=image`,
};

const RoverPhoto = ({ src, date, roverName }) => {
  return (
    <>
      <p>{roverName} - Date {date}</p>
      <img
        className={styles.nasaPicOfTheDayImg}
        src={src}
        alt={`${roverName} photo on ${date}`}
      />
    </>
  );
};

export const NasaCollaboration = () => {
  const [dailyImg, setDailyImg] = useState({});
  const [roverPhoto, setRoverPhoto] = useState({});

  useEffect(() => {
    const fetchRoverPhotos = async () => {
      const roverPhotoResponse = await fetch(NASA_URLs.marsRoverPhoto).then(response => response.json());
      setRoverPhoto(roverPhotoResponse);
    };

    fetchRoverPhotos();

    const fetchAstronomyPicOfTheDay = async () => {
      const dailyImgResponse = await fetch(NASA_URLs.astronomyPicOfTheDay).then(response => response.json());
      setDailyImg(dailyImgResponse);
    };

    fetchAstronomyPicOfTheDay(); 
  }, []);

  return (
    <div className="fullBGpicture">
      <main className="mainContent">
        <h1>Collaboration with NASA</h1>
        <section className="card">
          <h2>Astronomy Picture of the day</h2>
          {dailyImg.url ? (
            <>
              <p>{dailyImg.title}</p>
              <img className={styles.nasaPicOfTheDayImg} src={dailyImg.url} alt={dailyImg.title} />
              <p>{dailyImg.explanation}</p>
            </>
          ) : (
            <p>Loading astronomy picture of the day...</p>
          )}
        </section>
        <section className="card">
          <h2>Rover Photos</h2>
          {
            roverPhoto?.collection?.items?.length ? (
              <>
                
                {roverPhoto.collection.items.map((item, index) => (
                  <RoverPhoto
                    key={index}
                    src={item.links[0].href}
                    date={item.data[0]?.date_created?.slice(0, 10)}
                    roverName={item.data[0]?.title || 'Rover'}
                  />
                ))}
              </>
              ) : (
                <p>Loading rover photos...</p>
              )
            }
        </section>
      </main>
    </div>
  );
}

export default NasaCollaboration;
