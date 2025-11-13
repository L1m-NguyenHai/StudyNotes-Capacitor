import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { subjects as defaultSubjects } from "../data/mockData";
import { Subject } from "../types";
import SubjectCard from "./SubjectCard";
import SubjectModal from "./SubjectModal";
import ConfirmDialog from "./ConfirmDialog";
import Toast from "./Toast";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { StorageService } from "../services/storageService";

interface SubjectListProps {
  onSubjectSelect: (subject: Subject) => void;
}

function SubjectList({ onSubjectSelect }: SubjectListProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    subjectId: string | null;
  }>({ isOpen: false, subjectId: null });
  const [toast, setToast] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "warning";
    message: string;
  }>({ isOpen: false, type: "success", message: "" });

  // Load subjects from storage when component mounts
  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      setIsLoading(true);
      let loadedSubjects = await StorageService.loadSubjects();

      // Nếu chưa có subjects trong storage, sử dụng default và lưu lại
      if (loadedSubjects.length === 0) {
        loadedSubjects = defaultSubjects;
        await StorageService.saveSubjects(defaultSubjects);
      }

      setSubjects(loadedSubjects);
    } catch (error) {
      console.error("Failed to load subjects:", error);
      setSubjects(defaultSubjects);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubjectClick = async (subject: Subject) => {
    // Haptic feedback khi chọn môn học
    await Haptics.impact({ style: ImpactStyle.Light });
    onSubjectSelect(subject);
  };

  const handleAddSubject = async (
    name: string,
    icon: string,
    color: string
  ) => {
    try {
      const newSubject: Subject = {
        id: Date.now().toString(),
        name,
        icon,
        color,
      };

      await StorageService.addSubject(newSubject);
      setSubjects([...subjects, newSubject]);
      setIsModalOpen(false);

      // Haptic feedback
      await Haptics.impact({ style: ImpactStyle.Medium });

      // Show success toast
      setToast({
        isOpen: true,
        type: "success",
        message: "Subject added successfully!",
      });
    } catch (error) {
      console.error("Failed to add subject:", error);
      setToast({
        isOpen: true,
        type: "error",
        message: "Failed to add subject. Please try again.",
      });
    }
  };

  const handleEditSubject = async (
    name: string,
    icon: string,
    color: string
  ) => {
    if (editingSubject) {
      try {
        const updatedSubject = { ...editingSubject, name, icon, color };
        await StorageService.updateSubject(updatedSubject);

        setSubjects(
          subjects.map((subject) =>
            subject.id === editingSubject.id ? updatedSubject : subject
          )
        );
        setEditingSubject(null);
        setIsModalOpen(false);

        // Haptic feedback
        await Haptics.impact({ style: ImpactStyle.Light });

        // Show success toast
        setToast({
          isOpen: true,
          type: "success",
          message: "Subject updated successfully!",
        });
      } catch (error) {
        console.error("Failed to update subject:", error);
        setToast({
          isOpen: true,
          type: "error",
          message: "Failed to update subject. Please try again.",
        });
      }
    }
  };

  const handleDeleteSubject = (subjectId: string) => {
    setConfirmDialog({ isOpen: true, subjectId });
  };

  const confirmDelete = async () => {
    if (confirmDialog.subjectId) {
      try {
        await StorageService.deleteSubject(confirmDialog.subjectId);
        setSubjects(
          subjects.filter((subject) => subject.id !== confirmDialog.subjectId)
        );
        setConfirmDialog({ isOpen: false, subjectId: null });

        // Haptic feedback
        await Haptics.impact({ style: ImpactStyle.Heavy });

        // Show success toast
        setToast({
          isOpen: true,
          type: "success",
          message: "Subject deleted successfully!",
        });
      } catch (error) {
        console.error("Failed to delete subject:", error);
        setToast({
          isOpen: true,
          type: "error",
          message: "Failed to delete subject. Please try again.",
        });
      }
    }
  };

  const openAddModal = () => {
    setEditingSubject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (subject: Subject) => {
    setEditingSubject(subject);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSubject(null);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl min-h-screen">
      <header className="mb-8 sm:mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
          Study Notes
        </h1>
        <p className="text-slate-600 text-sm sm:text-lg mb-6 px-4">
          Select a subject to view and manage your notes
        </p>
        <button
          onClick={openAddModal}
          className="bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg mx-auto touch-manipulation active:scale-95"
          aria-label="Add new subject"
        >
          <Plus size={20} />
          Add Subject
        </button>
      </header>

      {isLoading ? (
        <div className="text-center py-16">
          <p className="text-slate-500 text-base sm:text-lg">
            Loading subjects...
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-w-2xl mx-auto">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onClick={() => handleSubjectClick(subject)}
              onEdit={() => openEditModal(subject)}
              onDelete={() => handleDeleteSubject(subject.id)}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <SubjectModal
          subject={editingSubject}
          onSave={editingSubject ? handleEditSubject : handleAddSubject}
          onClose={closeModal}
        />
      )}

      {confirmDialog.isOpen && (
        <ConfirmDialog
          title="Delete Subject?"
          message="Are you sure you want to delete this subject? All notes will be deleted too!"
          confirmText="Delete"
          cancelText="Cancel"
          danger={true}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmDialog({ isOpen: false, subjectId: null })}
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

export default SubjectList;
