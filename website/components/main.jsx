import React from "react";
import MainStyle from "./main.style";

function Main() {
  return (
    <MainStyle>
      <div className="content">
        <div className="profile">
          <img
            src="/images/hero.jpg"
            alt="Hero Banner Image"
            className="profile-img"
          />
        </div>
        <div className="name">Alliance Broadband Services Pvt.</div>
        <div className="description">
          WB : IN : AS
        </div>
        <div className="description">
          88.38320 : 22.51800
        </div>
        <div className="description">
          Asia/Kolkata
        </div>
      </div>
    </MainStyle>
  );
}
export default Main;
