import styled from "styled-components";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import ImgSlider from "./ImgSlider";
import EpisodeList from "./EpisodeList";
import db from "../firebase";

const Home = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchFirebaseData = async () => {
      try {
        if (!userData) {
          console.log("userName is null or undefined");
          return;
        } else {
          const userDocRef = doc(db, "userdata", userName);
          const snapshot = await getDoc(userDocRef);
          if (snapshot.exists()) {
            setUserData(snapshot.data());
          } else {
            console.log("snapshot does not exist in Home Component");
          }
        }
      } catch (error) {
        console.error("Error checking user document: ", error);
      }
    };
    fetchFirebaseData();
  }, [userData]); // Added loading as a dependency

  return (
    <Container>
      <ImgSlider />
      <EpisodeList userData={userData} />
      <p>test</p>
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/imgs/home-background.png") center center / cover no-repeat
      fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
