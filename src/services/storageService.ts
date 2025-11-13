import { Preferences } from "@capacitor/preferences";
import { Note, Subject } from "../types";

const NOTES_STORAGE_KEY = "study_notes";
const SUBJECTS_STORAGE_KEY = "study_subjects";

export class StorageService {
  /**
   * Lưu tất cả ghi chú theo môn học
   */
  static async saveNotes(notes: Note[]): Promise<void> {
    try {
      await Preferences.set({
        key: NOTES_STORAGE_KEY,
        value: JSON.stringify(notes),
      });
    } catch (error) {
      console.error("Error saving notes:", error);
      throw error;
    }
  }

  /**
   * Load tất cả ghi chú từ storage
   */
  static async loadNotes(): Promise<Note[]> {
    try {
      const { value } = await Preferences.get({ key: NOTES_STORAGE_KEY });
      if (value) {
        return JSON.parse(value) as Note[];
      }
      return [];
    } catch (error) {
      console.error("Error loading notes:", error);
      return [];
    }
  }

  /**
   * Load ghi chú theo môn học cụ thể
   */
  static async loadNotesBySubject(subjectId: string): Promise<Note[]> {
    const allNotes = await this.loadNotes();
    return allNotes.filter((note) => note.subjectId === subjectId);
  }

  /**
   * Thêm ghi chú mới
   */
  static async addNote(note: Note): Promise<void> {
    const allNotes = await this.loadNotes();
    allNotes.unshift(note); // Thêm vào đầu mảng
    await this.saveNotes(allNotes);
  }

  /**
   * Cập nhật ghi chú
   */
  static async updateNote(updatedNote: Note): Promise<void> {
    const allNotes = await this.loadNotes();
    const index = allNotes.findIndex((note) => note.id === updatedNote.id);
    if (index !== -1) {
      allNotes[index] = updatedNote;
      await this.saveNotes(allNotes);
    }
  }

  /**
   * Xóa ghi chú
   */
  static async deleteNote(noteId: string): Promise<void> {
    const allNotes = await this.loadNotes();
    const filteredNotes = allNotes.filter((note) => note.id !== noteId);
    await this.saveNotes(filteredNotes);
  }

  /**
   * Xóa tất cả dữ liệu
   */
  static async clearAll(): Promise<void> {
    try {
      await Preferences.remove({ key: NOTES_STORAGE_KEY });
    } catch (error) {
      console.error("Error clearing storage:", error);
      throw error;
    }
  }

  // ========== SUBJECT MANAGEMENT ==========

  /**
   * Lưu tất cả môn học
   */
  static async saveSubjects(subjects: Subject[]): Promise<void> {
    try {
      await Preferences.set({
        key: SUBJECTS_STORAGE_KEY,
        value: JSON.stringify(subjects),
      });
    } catch (error) {
      console.error("Error saving subjects:", error);
      throw error;
    }
  }

  /**
   * Load tất cả môn học từ storage
   */
  static async loadSubjects(): Promise<Subject[]> {
    try {
      const { value } = await Preferences.get({ key: SUBJECTS_STORAGE_KEY });
      if (value) {
        return JSON.parse(value) as Subject[];
      }
      return [];
    } catch (error) {
      console.error("Error loading subjects:", error);
      return [];
    }
  }

  /**
   * Thêm môn học mới
   */
  static async addSubject(subject: Subject): Promise<void> {
    const allSubjects = await this.loadSubjects();
    allSubjects.push(subject);
    await this.saveSubjects(allSubjects);
  }

  /**
   * Cập nhật môn học
   */
  static async updateSubject(updatedSubject: Subject): Promise<void> {
    const allSubjects = await this.loadSubjects();
    const index = allSubjects.findIndex(
      (subject) => subject.id === updatedSubject.id
    );
    if (index !== -1) {
      allSubjects[index] = updatedSubject;
      await this.saveSubjects(allSubjects);
    }
  }

  /**
   * Xóa môn học (và tất cả ghi chú liên quan)
   */
  static async deleteSubject(subjectId: string): Promise<void> {
    // Xóa môn học
    const allSubjects = await this.loadSubjects();
    const filteredSubjects = allSubjects.filter(
      (subject) => subject.id !== subjectId
    );
    await this.saveSubjects(filteredSubjects);

    // Xóa tất cả ghi chú của môn học đó
    const allNotes = await this.loadNotes();
    const filteredNotes = allNotes.filter(
      (note) => note.subjectId !== subjectId
    );
    await this.saveNotes(filteredNotes);
  }
}
