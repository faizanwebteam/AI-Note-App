import { generateSummary, improveNote, generateTags } from '../services/openaiService';

export default function AIButton({ note, setNote }) {
  const handleSummary = async () => {
    const summary = await generateSummary(note.content);
    alert('Summary: ' + summary);
  };

  const handleImprove = async () => {
    const improved = await improveNote(note.content);
    setNote({ ...note, content: improved });
  };

  const handleTags = async () => {
    const tags = await generateTags(note.content);
    setNote({ ...note, tags });
  };

  return (
    <div className="flex gap-2 mt-4">
      <button onClick={handleSummary} className="px-4 py-2 bg-purple-600 text-white rounded">AI Summary</button>
      <button onClick={handleImprove} className="px-4 py-2 bg-green-600 text-white rounded">AI Improve</button>
      <button onClick={handleTags} className="px-4 py-2 bg-blue-600 text-white rounded">Generate Tags</button>
    </div>
  );
}
