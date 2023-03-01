export default async function handler(req, res) {
  const ipAddress = req.headers["x-real-ip"];

  res.status(200).json(`yeah ${ipAddress}`);
}
