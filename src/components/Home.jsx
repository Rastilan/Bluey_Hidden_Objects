import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName } from "../features/user/userSlice";
import { useEffect } from "react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import ImgSlider from "./ImgSlider";
import EpisodeList from "./EpisodeList";



const Home = (props) => {


            

        return (
            <Container>
                <ImgSlider />
                <EpisodeList />
            </Container>
        )
    };

const Container = styled.main`
    position: relative;
    min-height: calc(100vh - 250px);
    overflow-x: hidden;
    display: block;
    top: 72px;
    padding: 0 calc(3.5vw + 5px);

        &:after{
            background: url('/imgs/home-background.png') center center / cover no-repeat fixed;
            content: "";
            position: absolute;
            inset: 0px;
            opacity: 1;
            z-index: -1;
        }
`

export default Home;