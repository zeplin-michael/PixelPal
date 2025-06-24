export default function validateItemFields(req, res, next) {
  const { price, type } = req.body;
  const allowedTypes = ["food", "clothing"];
  if (!allowedTypes.includes(type)) {
    return res
      .status(400)
      .send("Invalid item type. Must be 'food' or 'clothing'.");
  }
  if (!Number.isInteger(price) || price < 0) {
    return res.status(400).send("Price must be a non-negative integer.");
  }
  next();
}
