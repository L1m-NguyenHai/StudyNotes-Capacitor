import { Subject, Note } from '../types';

export const subjects: Subject[] = [
  { id: '1', name: 'Math', icon: 'Calculator', color: 'bg-blue-500' },
  { id: '2', name: 'Physics', icon: 'Atom', color: 'bg-green-500' },
  { id: '3', name: 'English', icon: 'BookOpen', color: 'bg-red-500' },
  { id: '4', name: 'IT', icon: 'Monitor', color: 'bg-cyan-500' },
  { id: '5', name: 'Literature', icon: 'BookMarked', color: 'bg-amber-500' },
  { id: '6', name: 'History', icon: 'Landmark', color: 'bg-orange-500' },
  { id: '7', name: 'Chemistry', icon: 'Flask', color: 'bg-emerald-500' },
  { id: '8', name: 'Biology', icon: 'Microscope', color: 'bg-teal-500' },
];

export const initialNotes: Note[] = [
  {
    id: '1',
    subjectId: '1',
    title: 'Quadratic Equations',
    content: 'The quadratic formula: x = (-b ± √(b²-4ac)) / 2a',
    createdAt: '2025-11-10',
  },
  {
    id: '2',
    subjectId: '1',
    title: 'Trigonometry Basics',
    content: 'sin²θ + cos²θ = 1. Remember SOHCAHTOA for right triangles.',
    createdAt: '2025-11-11',
  },
  {
    id: '3',
    subjectId: '2',
    title: "Newton's Laws",
    content: 'First Law: Object in motion stays in motion unless acted upon by external force.',
    createdAt: '2025-11-09',
  },
  {
    id: '4',
    subjectId: '3',
    title: 'Grammar Rules',
    content: 'Subject-verb agreement: singular subjects take singular verbs.',
    createdAt: '2025-11-12',
  },
];
