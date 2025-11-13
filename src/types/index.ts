export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Note {
  id: string;
  subjectId: string;
  title: string;
  content: string;
  createdAt: string;
}
