export default function handler(req, res) {
  const requestUrl = new URL(req.url, `https://${req.headers.host}`);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return res.status(400).send("Missing authorization code");
  }

  res.send(`
    <h2>Sonos Connected ✅</h2>
    <p>You can close this window.</p>
    <p>Authorization code received.</p>
  `);
}
