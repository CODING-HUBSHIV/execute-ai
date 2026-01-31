export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { goal } = req.body;

  if (!goal || typeof goal !== 'string') {
    return res.status(400).json({ error: 'Invalid goal' });
  }

  try {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            {
              role: 'system',
              content: `
You are a strict discipline enforcer.
Rules:
- Exactly 3 lines
- Each line under 8 words
- Commanding, no softness
- No emojis
- No explanations
`
            },
            {
              role: 'user',
              content: `Task: ${goal}`
            }
          ],
          temperature: 0.7,
          max_tokens: 60
        })
      }
    );

    if (!response.ok) {
      throw new Error('Groq API failed');
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';

    const lines = content
      .split('\n')
      .map(line => line.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter(Boolean)
      .slice(0, 3);

    if (!lines.length) {
      throw new Error('Empty response');
    }

    return res.status(200).json({ statements: lines });

  } catch (error) {
    return res.status(200).json({
      statements: [
        'Execute immediately',
        'Ignore how you feel',
        'Finish the task'
      ]
    });
  }
}
