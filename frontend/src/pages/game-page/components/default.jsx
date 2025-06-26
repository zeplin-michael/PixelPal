import { getAvatarActionImg } from "../../utils/avatarMeta";

function Default({ avatar }) {
  return (
    <div>
      <h1>HELLO!</h1>
      <div className="scene-img-container">
        <div className="scene-img-frame">
          <img
            className="scene-img"
            src={getAvatarActionImg(avatar, "idle")}
            alt="default idle img"
          />
        </div>
      </div>
    </div>
  );
}

export default Default;
