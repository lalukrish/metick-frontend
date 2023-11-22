import React from "react";
import UserSkillsProfile from "./userSkillsProfile";
import UserEducationProfile from "./userEducationProfile";
import UserProfileData from "./userProfileData";

const UserProfilePage = () => {
  return (
    <>
      <UserProfileData />
      <div style={{ margin: "20px" }}>
        <UserSkillsProfile />
      </div>
      <div style={{ margin: "20px" }}>
        <UserEducationProfile />
      </div>
    </>
  );
};

export default UserProfilePage;
