import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, publishedAt, author, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right:'0'  
          }}>

          <span
            className="badge rounded-pill bg-danger"
            >
            {source}
          </span>
            </div>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_01/2705191/nbc-social-default.png"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-outline-danger"
            >
              Read more
            </a>
            <p className="card-text">
              <small className="text-muted">
                {" "}
                By ~ {author ? author : "Unknown"} on{" "}
                {new Date(publishedAt).toGMTString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
