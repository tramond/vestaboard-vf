export default async function handler(req, res) {
  try {
    const response = await fetch("http://192.168.86.111:5005/zones");
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Sonos unreachable" });
  }
}
