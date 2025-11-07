import Note from "../models/Note.js";
import { generateSummary, improveNote, generateTags } from "../services/openaiService.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // Comes from your auth middleware
    const note = await Note.create({ title, content, user: userId });
    return res.status(201).json(note);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await Note.find({ user: userId });
    return res.json(notes);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    const updated = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    await Note.findByIdAndDelete(id);
    return res.json({ message: "Note deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// --- AI features ---

export const summarizeNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    const summary = await generateSummary(note.content);
    return res.json({ summary });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const improveNoteText = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    const improved = await improveNote(note.content);
    return res.json({ improved });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const generateNoteTags = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    const tags = await generateTags(note.content);
    note.tags = tags;
    await note.save();
    return res.json({ tags });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};