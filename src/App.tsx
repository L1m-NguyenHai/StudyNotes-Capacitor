import { useState } from 'react';
import SubjectList from './components/SubjectList';
import NotesScreen from './components/NotesScreen';
import { Subject } from './types';

function App() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const handleBack = () => {
    setSelectedSubject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {!selectedSubject ? (
        <SubjectList onSubjectSelect={handleSubjectSelect} />
      ) : (
        <NotesScreen subject={selectedSubject} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
