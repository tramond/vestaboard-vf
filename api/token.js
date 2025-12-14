import fetch from "node-fetch";

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) return res.status(400).send("Missing authorization code");

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", process.env.SONOS_REDIRECT_URI);
  params.append("client_id", process.env.SONOS_CLIENT_ID);
  params.append("client_secret", process.env.SONOS_CLIENT_SECRET);

  try {
    const response = await fetch("https://api.sonos.com/login/v3/oauth/access", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json(data);
    }

    // Return the access token (in production you would store securely!)
    res.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
