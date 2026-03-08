// Vercel Serverless Function: Get kitt_archive_summary.md from private repo

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const token = process.env.GITHUB_TOKEN;
    const owner = 'engawasanshin';
    const repo = 'kitt-data';
    const path = 'kitt_archive_summary.md';

    // GitHub API: Get file contents
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3.raw', // Get raw content
        'User-Agent': 'KITT-Assistant'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const content = await response.text();

    // Return raw markdown content
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(content);

  } catch (error) {
    console.error('Error fetching archive:', error);
    res.status(500).json({
      error: 'Failed to fetch archive',
      message: error.message
    });
  }
}
