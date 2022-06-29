import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ComicStrip from "../Components/ComicStrip";

function ViewComic() {
  const { comicId } = useParams();
  const [comicsData, setComic] = useState({});
  const [comicCount, setComicCount] = useState(0);
  const [latestNum, setLatestNum] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get("/getComic").then((response) => {
        setLatestNum(parseInt(response.data?.num));
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    try {
      axios.get(`/view/${comicId}`).then((response) => {
        setComic(response.data);
        if (localStorage.getItem(comicsData.num)) {
          localStorage.setItem(
            comicsData.num,
            parseInt(localStorage.getItem(comicsData.num)) + 1
          );
          setComicCount(localStorage.getItem(comicsData.num));
        } else {
          localStorage.setItem(comicsData.num, 0);
          setComicCount(localStorage.getItem(comicsData.num));
        }

        //   console.log(response.data);
      });
    } catch (e) {
      console.log(e);
    }
  }, [comicId]);

  function Next(e) {
    e.preventDefault();
    setComic({});
    navigate(`/view/${parseInt(comicId) + 1}`);
  }
  function Prev(e) {
    e.preventDefault();
    setComic({});
    navigate(`/view/${parseInt(comicId) - 1}`);
  }
  function Random(e) {
    e.preventDefault();
    setComic({});
    navigate(`/view/${Math.floor(Math.random() * parseInt(latestNum) + 1)}`);
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

export default ViewComic;
