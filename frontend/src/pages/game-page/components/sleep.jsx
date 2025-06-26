import { getAvatarActionImg } from "../../utils/avatarMeta";

function Sleep({ avatar }) {
  return (
    <div>
      <h1>sleep</h1>
      <div className="scene-img-container">
        <div className="scene-img-frame">
          <img
            className="scene-img"
            src={getAvatarActionImg(avatar, "sleeping")}
            alt="sleep image"
          />
        </div>
      </div>
    </div>
  );
}

export default Sleep;
