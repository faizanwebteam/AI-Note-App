export default function NoteEditor({ note, setNote }) {
  const handleChange = e => setNote({ ...note, content: e.target.value });

  return (
    <textarea
      className="w-full p-4 border rounded min-h-[200px]"
      value={note.content}
      onChange={handleChange}
    />
  );
}
