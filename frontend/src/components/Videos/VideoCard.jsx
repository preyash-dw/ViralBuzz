import "./Video.css";
const VideoCard = ({ src, title, date }) => {
    return (
      <div className="video-card">
        <video className="video-player" controls>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h3 className="video-title">{title}</h3>
        <p className="video-date">Posted on {date}</p>
      </div>
    )
  }
  export default VideoCard;