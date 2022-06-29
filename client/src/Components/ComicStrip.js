import React from "react";

function comicStrip(props) {
  return (
    <div className="comic-strip">
      <h1 className="heading">Comic Strip # {props.comicsData.num}</h1>
      <hr />
      <div style={{ height: "15px" }} />
      <div style={{ display: "flex" }}>
        <div style={{ display: "inline-block" }}>
          <button
            className={`button ${
              props.comicsData.num
                ? props.comicsData.num == 1
                  ? "disabled"
                  : ""
                : "disabled"
            }`}
            role="button"
            onClick={
              props.comicsData.num
                ? props.comicsData.num == 1
                  ? () => {}
                  : props.prev
                : () => {}
            }
          >
            Previous
          </button>
        </div>
        <div style={{ display: "inline-block", margin: "0 auto" }}>
          <button
            className={`button ${props.comicsData.num ? "" : "disabled"}`}
            role="button"
            onClick={props.comicsData.num ? props.random : () => {}}
          >
            Random
          </button>
        </div>
        <div style={{ display: "inline-block", float: "right" }}>
          <button
            className={`button ${
              props.comicsData.num
                ? props.comicsData.num == props.latestNum
                  ? "disabled"
                  : ""
                : "disabled"
            }`}
            role="button"
            onClick={
              props.comicsData.num
                ? props.comicsData.num == props.latestNum
                  ? () => {}
                  : props.next
                : () => {}
            }
          >
            Next
          </button>
        </div>
      </div>

      {props.comicsData.day ? (
        <div className="comic-image-div">
          <img
            src={props.comicsData.img}
            className="comic-image"
            width="100%"
          />
          <p
            style={{
              textAlign: "left",
              fontSize: "11px",
              padding: "0",
              margin: "0",
            }}
          >
            Views: {`${props.comicCount}`}
          </p>
          <p
            style={{
              textAlign: "right",
              fontSize: "11px",
              padding: "0",
              margin: "0",
            }}
          >
            Created on{" "}
            {`${props.comicsData.day}-${props.comicsData.month}-${props.comicsData.year}`}
          </p>
        </div>
      ) : (
        <div>
          <div className="comic-transcript">
            <p>Loading</p>
          </div>
        </div>
      )}
      <div style={{ height: "15px" }} />
      {props.comicsData.transcript ? (
        <div>
          <h1 className="sub-heading">Transcript</h1>
          <hr />
          <div className="comic-transcript">
            <p style={{ whiteSpace: "break-spaces" }}>
              {props.comicsData.transcript}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="sub-heading">Transcript</h1>
          <hr />
          <div className="comic-transcript">
            <p>No transcript available</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default comicStrip;
