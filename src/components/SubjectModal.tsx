import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Subject } from "../types";
import * as Icons from "lucide-react";

interface SubjectModalProps {
  subject: Subject | null;
  onSave: (name: string, icon: string, color: string) => void;
  onClose: () => void;
}

const availableIcons = [
  "Calculator",
  "Atom",
  "BookOpen",
  "Monitor",
  "BookMarked",
  "Landmark",
  "Beaker",
  "Microscope",
  "Brain",
  "Code",
  "Palette",
  "Music",
  "Trophy",
  "Dumbbell",
  "Globe",
  "Rocket",
  "Camera",
  "Heart",
  "Star",
  "Zap",
];

const availableColors = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Red", value: "bg-red-500" },
  { name: "Cyan", value: "bg-cyan-500" },
  { name: "Amber", value: "bg-amber-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Emerald", value: "bg-emerald-500" },
  { name: "Teal", value: "bg-teal-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Indigo", value: "bg-indigo-500" },
  { name: "Rose", value: "bg-rose-500" },
];

function SubjectModal({ subject, onSave, onClose }: SubjectModalProps) {
  const [name, setName] = useState(subject?.name || "");
  const [icon, setIcon] = useState(subject?.icon || "BookOpen");
  const [color, setColor] = useState(subject?.color || "bg-blue-500");

  useEffect(() => {
    setName(subject?.name || "");
    setIcon(subject?.icon || "BookOpen");
    setColor(subject?.color || "bg-blue-500");
  }, [subject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name, icon, color);
    }
  };

  const IconComponent = Icons[
    icon as keyof typeof Icons
  ] as React.ComponentType<{
    size?: number;
    className?: string;
  }>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-up sm:animate-scale-in modal-content">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">
            {subject ? "Edit Subject" : "Add New Subject"}
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
          {/* Preview */}
          <div className="mb-6 flex justify-center">
            <div
              className={`${color} w-24 h-24 rounded-xl flex items-center justify-center shadow-lg`}
            >
              {IconComponent && (
                <IconComponent size={48} className="text-white" />
              )}
            </div>
          </div>

          {/* Subject Name */}
          <div className="mb-6">
            <label
              htmlFor="subject-name"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Subject Name
            </label>
            <input
              id="subject-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter subject name"
              required
            />
          </div>

          {/* Icon Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Icon
            </label>
            <div className="grid grid-cols-5 gap-3">
              {availableIcons.map((iconName) => {
                const Icon = Icons[
                  iconName as keyof typeof Icons
                ] as React.ComponentType<{
                  size?: number;
                  className?: string;
                }>;
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setIcon(iconName)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      icon === iconName
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {Icon && (
                      <Icon size={24} className="mx-auto text-slate-700" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Select Color
            </label>
            <div className="grid grid-cols-6 gap-3">
              {availableColors.map((colorOption) => (
                <button
                  key={colorOption.value}
                  type="button"
                  onClick={() => setColor(colorOption.value)}
                  className={`h-12 rounded-lg ${
                    colorOption.value
                  } transition-all ${
                    color === colorOption.value
                      ? "ring-4 ring-slate-300 scale-110"
                      : "hover:scale-105"
                  }`}
                  title={colorOption.name}
                />
              ))}
            </div>
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
              className="w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all shadow-lg touch-manipulation active:scale-95"
            >
              {subject ? "Save Changes" : "Add Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SubjectModal;
