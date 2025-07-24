// Vercel API Route - Secure Gemini API Key Delivery
export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get API Key from environment variables (server-side only)
  const geminiApiKey = process.env.geminiApiKey || process.env.GEMINI_API_KEY;
  
  if (!geminiApiKey) {
    console.error('❌ Gemini API Key not found in environment variables');
    return res.status(500).json({ error: 'API Key not configured' });
  }

  // Add CORS headers for frontend access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Add cache headers
  res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
  
  // Return API Key securely
  res.status(200).json({ 
    success: true,
    geminiApiKey: geminiApiKey,
    timestamp: new Date().toISOString()
  });
}
