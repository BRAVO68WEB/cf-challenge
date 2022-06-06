import React, { useEffect, useState } from "react";
import MainStyle from "./main.style";
import axios from "axios";

function Main() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://cf-challenge.dftechs.workers.dev/ipinfo").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  if (!loading) {
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
          <div className="name">
            {data?.asOrganization} , {data?.city}
          </div>
          <div className="description">
            {data?.region} / {data?.country} / {data?.continent}
          </div>
          <div className="description">
            Lang :- {data?.longitude} | Lat :- {data?.latitude}
          </div>
          <div className="description">Timezone :- {data?.timezone}</div>
        </div>
      </MainStyle>
    );
  } else {
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
          <div className="name">Data</div>
          <div className="description">State : Country : Continent</div>
          <div className="description">Longitude : Latitude</div>
          <div className="description">Timezone</div>
        </div>
      </MainStyle>
    );
  }
}
export default Main;
