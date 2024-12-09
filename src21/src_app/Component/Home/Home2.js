import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { demoUsers } from "../../asset/data";
import { fetchPlanRecords ,fetchUserLevel} from "../Navigation/Allapi";

const Homeplan = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(demoUsers);
  const [topUserIndex, setTopUserIndex] = useState(0);
  const [activePlanId, setActivePlanId] = useState(null); // State for active plan ID
  const [plans, setPlans] = useState([]); // State for all plans

  useEffect(() => {
    resultDataPlan();
    resultDataLevel();
  }, []);

  const  resultDataPlan= async () => {
    try {
      const featchData = await fetchPlanRecords();
      setPlans(featchData);
    } catch (error) {
      console.error(error);
    }
  };

  const  resultDataLevel= async () => {
    try {
      const featchData = await fetchUserLevel();
      setActivePlanId(featchData.activePlan._id);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTopUserIndex((prevIndex) => (prevIndex + 1) % users.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [users]);

  useEffect(() => {
    const earningsInterval = setInterval(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          earning: user.earning + Math.floor(Math.random() * 50), // Random increase
        }))
      );
    }, 5000);

    return () => clearInterval(earningsInterval);
  }, []);

  const displayUsers = users
    .map((user, index) => ({
      ...user,
      isTopUser: index === topUserIndex,
    }))
    .sort((a, b) => b.earning - a.earning)
    .slice(0, 5);

  const handlePlanClick = (item) => {
    if (item._id === activePlanId) {
      navigate("/Order"); // Only navigate if it's the active plan
    }
  };

  return (
    <div>
      <div className="screenMiddle3">
        {plans.map((item) => (
          <button
            className={`cardPlan ${item._id !== activePlanId ? "locked" : ""}`}
            key={item._id}
            onClick={() => handlePlanClick(item)} // Call handlePlanClick on click
          >
            <img src={item.planImg} alt={item.title} className="cardImage" />
            {item._id !== activePlanId && (
              <div className="lockIcon">
                <FontAwesomeIcon icon={faLock} style={{ color: "#000" }} />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="userListH">
        {displayUsers.map((user, index) => (
          <div
            className={`cardH ${user.isTopUser ? "topUserH" : ""}`}
            key={user.id}
          >
            <div className="userInfoRowH">
              <img src={user.img} alt="Profile" className="avatar-imgH" />
            </div>
            <div className="userInfoColumnH">
              <div className="usernameH">{user.username}</div>
              <div className="earningH">${user.earning}</div>
              <div className="countryH">{user.country}</div>
            </div>
            <div>
              <FontAwesomeIcon icon={faStar} className="icon1H" />
              {user.isTopUser && <div className="topUserTagH">Top User</div>}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: "100px" }}></div>
    </div>
  );
};
export default Homeplan;


// resultData();
    // resultDataFeatch();
  // const resultData = async () => {
  //   const userId = localStorage.getItem("userId");
  //    try {
  //     const response = await api.get(`${baseUrlapp}getUserLevel?userId=${userId}`);
  //     const userData = response.data.data;
  //     setActivePlanId(userData.activePlan._id); // Set active plan ID
  //     console.log("User level data:", userData);
  //   } catch (error) {
  //     console.error("Error fetching user level:", error);
  //   }
  // };

  // const resultDataFeatch = async () => {
  //   try {
  //     const result = await api.get(baseUrlapp + "getPlanRecordsUser");
  //     if (result.data) {
  //       setPlans(result.data.data);
  //     } else {
  //       console.log("Error: unable to retrieve plan data");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };