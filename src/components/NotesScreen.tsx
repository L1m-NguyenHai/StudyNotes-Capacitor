import { useState, useEffect } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Subject, Note } from "../types";
import { StorageService } from "../services/storageService";
import NoteCard from "./NoteCard";
import NoteModal from "./NoteModal";
import ConfirmDialog from "./ConfirmDialog";
import Toast from "./Toast";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

interface NotesScreenProps {
  subject: Subject;
  onBack: () => void;
}

function NotesScreen({ subject, onBack }: NotesScreenProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    noteId: string | null;
  }>({ isOpen: false, noteId: null });
  const [toast, setToast] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "warning";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  // Load notes from storage when component mounts
  useEffect(() => {
    loadNotes();
  }, [subject.id]);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      const loadedNotes = await StorageService.loadNotesBySubject(subject.id);
      setNotes(loadedNotes);
    } catch (error) {
      console.error("Failed to load notes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async (title: string, content: string) => {
    try {
      const newNote: Note = {
        id: Date.now().toString(),
        subjectId: subject.id,
        title,
        content,
        createdAt: new Date().toISOString().split("T")[0],
      };

      await StorageService.addNote(newNote);
      setNotes([newNote, ...notes]);
      setIsModalOpen(false);

      // Haptic feedback khi thêm note thành công
      await Haptics.impact({ style: ImpactStyle.Medium });

      // Show success toast
      setToast({
        isOpen: true,
        type: "success",
        message: "Note added successfully!",
      });
    } catch (error) {
      console.error("Failed to add note:", error);
      setToast({
        isOpen: true,
        type: "error",
        message: "Failed to add note. Please try again.",
      });
    }
  };

  const handleEditNote = async (title: string, content: string) => {
    if (editingNote) {
      try {
        const updatedNote = { ...editingNote, title, content };
        await StorageService.updateNote(updatedNote);

        setNotes(
          notes.map((note) => (note.id === editingNote.id ? updatedNote : note))
        );
        setEditingNote(null);
        setIsModalOpen(false);

        // Haptic feedback khi cập nhật thành công
        await Haptics.impact({ style: ImpactStyle.Light });

        // Show success toast
        setToast({
          isOpen: true,
          type: "success",
          message: "Note updated successfully!",
        });
      } catch (error) {
        console.error("Failed to update note:", error);
        setToast({
          isOpen: true,
          type: "error",
          message: "Failed to update note. Please try again.",
        });
      }
    }
  };

  const handleDeleteNote = (id: string) => {
    setConfirmDialog({ isOpen: true, noteId: id });
  };

  const confirmDelete = async () => {
    if (confirmDialog.noteId) {
      try {
        await StorageService.deleteNote(confirmDialog.noteId);
        setNotes(notes.filter((note) => note.id !== confirmDialog.noteId));
        setConfirmDialog({ isOpen: false, noteId: null });

        // Haptic feedback khi xóa thành công
        await Haptics.impact({ style: ImpactStyle.Heavy });

        // Show success toast
        setToast({
          isOpen: true,
          type: "success",
          message: "Note deleted successfully!",
        });
      } catch (error) {
        console.error("Failed to delete note:", error);
        setToast({
          isOpen: true,
          type: "error",
          message: "Failed to delete note. Please try again.",
        });
      }
    }
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl min-h-screen">
      <header className="mb-6 sm:mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-4 sm:mb-6 transition-colors touch-manipulation active:scale-95"
          aria-label="Back to subjects"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Subjects</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              {subject.name}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </p>
          </div>
          <button
            onClick={openAddModal}
            className={`${subject.color} text-white px-5 sm:px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg touch-manipulation active:scale-95 w-full sm:w-auto`}
            aria-label="Add new note"
          >
            <Plus size={20} />
            Add Note
          </button>
        </div>
      </header>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <p className="text-slate-500 text-lg">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <p className="text-slate-500 text-lg mb-4">No notes yet</p>
            <p className="text-slate-400">
              Click "Add Note" to create your first note
            </p>
          </div>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={openEditModal}
              onDelete={handleDeleteNote}
              accentColor={subject.color}
            />
          ))
        )}
      </div>

      {isModalOpen && (
        <NoteModal
          note={editingNote}
          onSave={editingNote ? handleEditNote : handleAddNote}
          onClose={closeModal}
          accentColor={subject.color}
        />
      )}

      {confirmDialog.isOpen && (
        <ConfirmDialog
          title="Delete Note?"
          message="Are you sure you want to delete this note? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          danger={true}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDialog({ isOpen: false, noteId: null })}
        />
      )}

      {toast.isOpen && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, isOpen: false })}
        />
      )}
    </div>
  );
}

export default NotesScreen;
