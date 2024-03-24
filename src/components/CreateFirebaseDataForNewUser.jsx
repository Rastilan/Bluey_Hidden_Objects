// This is hardcoded because it may have multiple objects in a single episode or none, instead of rewriting code, I can just modify this array.  

import { setDoc } from "firebase/firestore";
import { selectUserDocSnapshot } from "../features/user/userSlice";
import { useSelector } from "react-redux";

const createFirebaseDataForNewUser = async (userDocRef) => {

    const longDogStatusArray = [
        "LongDog S01EP01",
        "LongDog S01EP02",
        "LongDog S01EP03",
        "LongDog S01EP04",
        "LongDog S01EP05",
        "LongDog S01EP06",
        "LongDog S01EP07",
        "LongDog S01EP08",
        "LongDog S01EP09",
        "LongDog S01EP10",
        "LongDog S01EP11",
        "LongDog S01EP12",
        "LongDog S01EP13",
        "LongDog S01EP14",
        "LongDog S01EP15",
        "LongDog S01EP16",
        "LongDog S01EP17",
        "LongDog S01EP18",
        "LongDog S01EP19",
        "LongDog S01EP20",
        "LongDog S01EP21",
        "LongDog S01EP22",
        "LongDog S01EP23",
        "LongDog S01EP24",
        "LongDog S01EP25",
        "LongDog S01EP26",
        "LongDog S01EP27",
        "LongDog S01EP28",
        "LongDog S01EP29",
        "LongDog S01EP30",
        "LongDog S01EP31",
        "LongDog S01EP32",
        "LongDog S01EP33",
        "LongDog S01EP34",
        "LongDog S01EP35",
        "LongDog S01EP36",
        "LongDog S01EP37",
        "LongDog S01EP38",
        "LongDog S01EP39",
        "LongDog S01EP40",
        "LongDog S01EP41",
        "LongDog S01EP42",
        "LongDog S01EP43",
        "LongDog S01EP44",
        "LongDog S01EP45",
        "LongDog S01EP46",
        "LongDog S01EP47",
        "LongDog S01EP48",
        "LongDog S01EP49",
        "LongDog S01EP50",
        "LongDog S01EP51",
        "LongDog S01EP52",
        "LongDog S02EP01",
        "LongDog S02EP02",
        "LongDog S02EP03",
        "LongDog S02EP04",
        "LongDog S02EP05",
        "LongDog S02EP06",
        "LongDog S02EP07",
        "LongDog S02EP08",
        "LongDog S02EP09",
        "LongDog S02EP10",
        "LongDog S02EP11",
        "LongDog S02EP12",
        "LongDog S02EP13",
        "LongDog S02EP14",
        "LongDog S02EP15",
        "LongDog S02EP16",
        "LongDog S02EP17",
        "LongDog S02EP18",
        "LongDog S02EP19",
        "LongDog S02EP20",
        "LongDog S02EP21",
        "LongDog S02EP22",
        "LongDog S02EP23",
        "LongDog S02EP24",
        "LongDog S02EP25",
        "LongDog S02EP26",
        "LongDog S02EP27",
        "LongDog S02EP28",
        "LongDog S02EP29",
        "LongDog S02EP30",
        "LongDog S02EP31",
        "LongDog S02EP32",
        "LongDog S02EP33",
        "LongDog S02EP34",
        "LongDog S02EP35",
        "LongDog S02EP36",
        "LongDog S02EP37",
        "LongDog S02EP38",
        "LongDog S02EP39",
        "LongDog S02EP40",
        "LongDog S02EP41",
        "LongDog S02EP42",
        "LongDog S02EP43",
        "LongDog S02EP44",
        "LongDog S02EP45",
        "LongDog S02EP46",
        "LongDog S02EP47",
        "LongDog S02EP48",
        "LongDog S02EP49",
        "LongDog S02EP50",
        "LongDog S02EP51",
        "LongDog S02EP52",
        "LongDog S03EP01",
        "LongDog S03EP02",
        "LongDog S03EP03",
        "LongDog S03EP04",
        "LongDog S03EP05",
        "LongDog S03EP06",
        "LongDog S03EP07",
        "LongDog S03EP08",
        "LongDog S03EP09",
        "LongDog S03EP10",
        "LongDog S03EP11",
        "LongDog S03EP12",
        "LongDog S03EP13",
        "LongDog S03EP14",
        "LongDog S03EP15",
        "LongDog S03EP16",
        "LongDog S03EP17",
        "LongDog S03EP18",
        "LongDog S03EP19",
        "LongDog S03EP20",
        "LongDog S03EP21",
        "LongDog S03EP22",
        "LongDog S03EP23",
        "LongDog S03EP24",
        "LongDog S03EP25",
        "LongDog S03EP26",
        "LongDog S03EP27",
        "LongDog S03EP28",
        "LongDog S03EP29",
        "LongDog S03EP30",
        "LongDog S03EP31",
        "LongDog S03EP32",
        "LongDog S03EP33",
        "LongDog S03EP34",
        "LongDog S03EP35",
        "LongDog S03EP36",
        "LongDog S03EP37",
        "LongDog S03EP38",
        "LongDog S03EP39",
        "LongDog S03EP40",
        "LongDog S03EP41",
        "LongDog S03EP42",
        "LongDog S03EP43",
        "LongDog S03EP44",
        "LongDog S03EP45",
        "LongDog S03EP46",
        "LongDog S03EP47",
        "LongDog S03EP48",
        "LongDog S03EP49",
        "LongDog S03EP50",
        "LongDog S03EP51",
        "LongDog S03EP52"
    ];

  
    const data = longDogStatusArray.reduce((acc, curr) => {
        acc[curr] = false;
        return acc;
      }, {});
    
      try {
        await setDoc(userDocRef, data, { merge: true });
        console.log("Firebase data for new user created successfully.");
      } catch (error) {
        console.error("Error creating Firebase data for new user:", error);
      }
    };
    
    export default createFirebaseDataForNewUser;