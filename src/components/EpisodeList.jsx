import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import eps from "../seasondata/hiddenObjs.json";
import { selectUserName, selectUserDocSnapshot, setUserDocSnapshot } from "../features/user/userSlice";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";



function transformEpisodesData(episodeData) {
  const episodesArray = [];

  // Loop through the original data
  for (const seasonNum in episodeData[0].Season) {
    const episodes = episodeData[0].Season[seasonNum].Episode;

    // Loop through episodes in the season
    for (const episodeNum in episodes) {
      const episode = episodes[episodeNum];
      episode.Season = seasonNum; // Add season number to the episode object
      episode.Episode = episodeNum; // Add episode number to the episode object
      episodesArray.push(episode); // Push the modified episode object to the array
    }
  }

  return episodesArray;
}

const episodeData = transformEpisodesData(eps);

const EpisodeList = (props) => {
  const userName = useSelector(selectUserName);
  const userDocSnapshot = useSelector(selectUserDocSnapshot);
  const [userData, setUserData] = useState({});

  const [isFound, setIsFound] = useState(true);
  


  useEffect(() => {
    const fetchFirebaseData = async () => {
      try {
        if (!userDocSnapshot) { // Fetch only if userDocSnapshot is null
          const userDocRef = doc(db, "userdata", userName);
          const snapshot = await getDoc(userDocRef);
          setUserDocSnapshot(snapshot); // Update userDocSnapshot in Redux store
        } else if (userDocSnapshot.exists()) {
          const data = userDocSnapshot.data();
          setUserData(data); // Update userData when userDocSnapshot changes
          // Now you can access userData.title, userData.backgroundImg, etc.
        }
      } catch (error) {
        console.error("Error checking user document: ", error);
      }
    };
        
    fetchFirebaseData(); // Fetch data when component mounts or userDocSnapshot changes
  }, [userDocSnapshot, userName]); // Add userDocSnapshot and userName as dependencies
  
  // Ensure userData is set if it's initially null
  if (!userData && userDocSnapshot) {
    const data = userDocSnapshot.data();
    setUserData(data); 
  }

console.log(userData["LongDog S01EP01"])
    
  return (
    <Container>
      <h4>Season 1</h4>
      <Content>
        {episodeData.map((episode, index) => (
            episode.Season === "1" && (
          <Wrap key={index}>
            <Link to={`/episodelist/${episode.Season}/${episode.Episode}`}>
            <img src={userData[`LongDog S${episode.Season}EP${episode.Episode}`] ? episode.ImgLongDogShown : episode.ImgLongDogHidden} alt={episode.Name} />      
            <h4>{`Episode ${episode.Episode}: ${episode.Name}`}</h4>
            </Link>
          </Wrap>
            )
        ))}
      </Content>
    </Container>
  );
};

const Container = styled.div`
    padding: 0 0 26px;
`;

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr));

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const Wrap = styled.div`
    padding-top: 56.25%;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
        rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    border: 3px solid rgba(249, 249, 249, 0.1);
    img {
        inset: 0px;
        display: block;
        height: 100%;
        object-fit: cover;
        opacity: 1;
        position: absolute;
        transition: opacity 500ms ease-in-out 0s;
        width: 100%;
        z-index: -1;
        top: 0;
    }
    &:hover {
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        transform: scale(1.05);
        border-color: rgba(249, 249, 249, 0.8);
    }
`;

export default EpisodeList;