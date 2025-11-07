export const generateSummary = async (text) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/ai/summary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  return data.summary;
};

export const improveNote = async (text) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/ai/improve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  return data.improved;
};

export const generateTags = async (text) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/ai/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const data = await res.json();
  return data.tags;
};
