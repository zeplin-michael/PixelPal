export const AVATAR_META = {
  green_alien: { folder: "green_alien", prefix: "gn_alien" },
  gold_robot: { folder: "gold_robot", prefix: "gld_robot" },
  grey_alien: { folder: "grey_alien", prefix: "gy_alien" },
  pink_alien: { folder: "pink_alien", prefix: "pk_alien" },
  red_robot: { folder: "red_robot", prefix: "red_robot" },
  silver_robot: { folder: "silver_robot", prefix: "slr_robot" },
  // Add more as needed
};

export function getAvatarActionImg(avatar, action) {
  const meta = AVATAR_META[avatar];
  if (!meta) return ""; // fallback or placeholder
  return `/assets/pals/${meta.folder}/${meta.prefix}_${action}.gif`;
}
