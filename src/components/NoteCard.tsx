import { Edit2, Trash2, Calendar } from 'lucide-react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  accentColor: string;
}

function NoteCard({ note, onEdit, onDelete, accentColor }: NoteCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4" style={{ borderLeftColor: accentColor.replace('bg-', '').split('-')[0] }}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-xl font-semibold text-slate-800 flex-1">
          {note.title}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(note)}
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit note"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete note"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-slate-600 mb-4 whitespace-pre-wrap leading-relaxed">
        {note.content}
      </p>

      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Calendar size={14} />
        <span>{note.createdAt}</span>
      </div>
    </div>
  );
}

export default NoteCard;
