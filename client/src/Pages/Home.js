import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";
import ComicStrip from "../Components/ComicStrip";

function Home() {
  const { comicId } = useParams();
  const [comicsData, setComicsData] = useState({});
  const [comicCount, setComicCount] = useState(0);
  const [latestNum, setLatestNum] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(comicId);
    try {
      axios.get("/getComic").then((response) => {
        setComicsData(response.data);
        // console.log(response.data);
        if (localStorage.getItem(comicsData.num)) {
          localStorage.setItem(
            comicsData.num,
            parseInt(localStorage.getItem(comicsData.num)) + 1
          );
          setComicCount(localStorage.getItem(comicsData.num));
          setLatestNum(parseInt(response.data?.num));
        } else {
          localStorage.setItem(comicsData.num, 0);
          setComicCount(localStorage.getItem(comicsData.num));
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  function Next(e) {
    e.preventDefault();
    navigate(`/view/${parseInt(comicsData.num) + 1}`);
  }
  function Prev(e) {
    e.preventDefault();
    navigate(`/view/${parseInt(comicsData.num) - 1}`);
  }
  function Random(e) {
    e.preventDefault();
    navigate(
      `/view/${Math.floor(Math.random() * parseInt(latestNum) + 1)}`
    );
  }

  return (
    <ComicStrip
      comicId={comicId}
      comicsData={comicsData}
      comicCount={comicCount}
      latestNum={latestNum}
      next={Next}
      prev={Prev}
      random={Random}
    />
  );
}

export default Home;
