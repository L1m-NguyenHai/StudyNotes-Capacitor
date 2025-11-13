import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Note } from "../types";

interface NoteModalProps {
  note: Note | null;
  onSave: (title: string, content: string) => void;
  onClose: () => void;
  accentColor: string;
}

function NoteModal({ note, onSave, onClose, accentColor }: NoteModalProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave(title, content);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up sm:animate-scale-in modal-content">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">
            {note ? "Edit Note" : "Add New Note"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label
              htmlFor="note-title"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Title
            </label>
            <input
              id="note-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter note title"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="note-content"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Content
            </label>
            <textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter note content"
              required
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center gap-3 sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors touch-manipulation"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-full sm:w-auto ${accentColor} text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all shadow-lg touch-manipulation active:scale-95`}
            >
              {note ? "Save Changes" : "Add Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
