import { getAvatarActionImg } from "../../utils/avatarMeta";

function Play({ avatar }) {
  return (
    <div>
      <h1>play</h1>
      <div className="scene-img-container">
        <div className="scene-img-frame">
          <img
            className="scene-img"
            src={getAvatarActionImg(avatar, "playing")}
            alt="playing img"
          />
        </div>
      </div>
    </div>
  );
}

export default Play;
