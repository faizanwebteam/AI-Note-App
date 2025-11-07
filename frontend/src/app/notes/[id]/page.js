'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import NoteEditor from '../../components/NoteEditor';
import AIButton from '../../components/AIButton';

export default function NoteDetailPage() {
  const params = useParams();
  const [note, setNote] = useState(null);

  const fetchNote = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setNote(data);
  };

  useEffect(() => {
    fetchNote();
  }, [params.id]);

  if (!note) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <NoteEditor note={note} setNote={setNote} />
      <AIButton note={note} setNote={setNote} />
    </div>
  );
}
