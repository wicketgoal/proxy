export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send("Missing URL parameter. Use ?url=https://example.com");
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://yourdomain.com'
      }
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');

    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    res.status(500).send("Proxy Error: " + err.toString());
  }
}
