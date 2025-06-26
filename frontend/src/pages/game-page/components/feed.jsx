import { getAvatarActionImg } from "../../utils/avatarMeta";

function Feed({ avatar }) {
  return (
    <div>
      <h1>feed</h1>
      <div className="scene-img-container">
        <div className="scene-img-frame">
          <img
            className="scene-img"
            src={getAvatarActionImg(avatar, "eating")}
            alt="feed image"
          />
        </div>
      </div>
    </div>
  );
}

export default Feed;
