import { Subject } from "../types";
import * as Icons from "lucide-react";
import { Edit2, Trash2 } from "lucide-react";

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function SubjectCard({ subject, onClick, onEdit, onDelete }: SubjectCardProps) {
  const IconComponent = Icons[
    subject.icon as keyof typeof Icons
  ] as React.ComponentType<{ size?: number; className?: string }>;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 sm:hover:-translate-y-1 w-full touch-manipulation">
      {/* Action buttons - Always visible on mobile, hover on desktop */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-1.5 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={handleEdit}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors active:scale-95 touch-manipulation shadow-md"
          aria-label="Edit subject"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={handleDelete}
          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors active:scale-95 touch-manipulation shadow-md"
          aria-label="Delete subject"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Main content - clickable */}
      <button
        onClick={onClick}
        className="flex items-center gap-4 w-full p-4 sm:p-5 text-left touch-manipulation active:opacity-70 transition-opacity"
        aria-label={`View ${subject.name} notes`}
      >
        <div
          className={`${subject.color} w-16 h-16 sm:w-18 sm:h-18 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md`}
        >
          {IconComponent && <IconComponent size={32} className="text-white" />}
        </div>
        <div className="flex-1 min-w-0 pr-16">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-slate-900 line-clamp-1 mb-1">
            {subject.name}
          </h2>
          <p className="text-sm text-slate-500">View notes</p>
        </div>
      </button>
    </div>
  );
}

export default SubjectCard;
