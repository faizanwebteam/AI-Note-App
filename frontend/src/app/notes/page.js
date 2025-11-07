'use client';

import { useEffect, useState } from 'react';
import NoteCard from '../../components/NoteCard';
import SearchBar from '../../components/SearchBar';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredNotes.map(note => <NoteCard key={note._id} note={note} />)}
      </div>
    </div>
  );
}
