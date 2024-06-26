import styled from "styled-components";
import db, { auth, provider } from "../firebase.jsx";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, getDocs } from "firebase/firestore";
import createFirebaseDataForNewUser from "./CreateFirebaseDataForNewUser.jsx";

const Header = () => {
  const navigate = useNavigate();
  let [user, setUser] = useState({});

  /*//reroutes logged in users
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        navigate("/home");
      }
    });
  }, [userName]);

  useEffect(() => {
    const fetchData = async () => {
      if (userName) {
        try {
          const userDocRef = doc(db, "userdata", userName);
          const userDocSnapshot = await getDocs(userDocRef);
          console.log(userName);
          if (!userDocSnapshot.exists()) {
            await createFirebaseData(userDocRef);
          } else {
            console.log("Firebase Doc already exists");
          }
        } catch (error) {
          console.error("Error fetching user data document:", error);
        }
      }
    };

    fetchData();
  }, [userName]); */

  const checkSavedUser = () => {
    if (localStorage.getItem("savedUser") && !user) {
      setUser(localStorage.getItem("savedUser"));
    }
  };
  checkSavedUser();

  const handleAuth = () => {
    if (!user.userName) {
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser({
            userName: result.user.displayName,
            userPhoto: result.user.photoURL,
            userEmail: result.user.email,
          });
          let newSavedUser = {
            userName: result.user.displayName,
            userPhoto: result.user.photoURL,
            userEmail: result.user.email,
          };
          localStorage.setItem("savedUser", JSON.stringify(newSavedUser));
          navigate("/home");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (user.userName) {
      auth
        .signOut()
        .then(() => {
          localStorage.removeItem("savedUser");
          navigate("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  /*
  let createFirebaseData = async (userDocRef) => {
    try {
      await createFirebaseDataForNewUser(userDocRef);
    } catch (error) {
      console.error("Error creating Firebase data for new user:", error);
    }
  };
 */
  return (
    <Nav>
      <Logo>
        <img src="" alt="" />
      </Logo>

      {!user.userName ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <span>Home</span>
            </a>
            <a>
              <span>Long Dogs</span>
            </a>
            <a>
              <span>Chattermax</span>
            </a>
            <a>
              <span>About</span>
            </a>
            <a>
              <span>Contact Me</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg src={""} alt={""} />
            <DropDown>
              <span onClick={handleAuth}>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }
    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span: before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }

    /* @media (max-width: 768px) {
        display: none;
    }
    */
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 918px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
