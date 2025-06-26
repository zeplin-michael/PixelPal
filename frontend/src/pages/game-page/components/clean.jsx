import { getAvatarActionImg } from "../../utils/avatarMeta";

function Clean({ avatar }) {
  return (
    <div>
      <h1>clean</h1>
      <div className="scene-img-container">
        <div className="scene-img-frame">
          <img
            className="scene-img"
            src={getAvatarActionImg(avatar, "bath")}
            alt="clean img"
          />
        </div>
      </div>
    </div>
  );
}

export default Clean;
