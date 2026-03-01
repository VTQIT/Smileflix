export default async function handler(req, res) {
  const { q, max = 12 } = req.query;

  if (!process.env.YOUTUBE_API_KEY) {
    return res.status(500).json({ error: "Missing YOUTUBE_API_KEY" });
  }

  if (!q) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${max}&q=${encodeURIComponent(
        q
      )}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
