import React, { useState } from 'react';
import { Plus, Edit, Trash2, BookOpen, Users, Clock, Calendar } from 'lucide-react';

interface Class {
  id: string;
  name: string;
  grade: string;
  section: string;
  students: number;
  classTeacher: string;
  subjects: string[];
  schedule: { [key: string]: any[] };
}

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  classes: string[];
  teachers: string[];
}

const ClassSubjectManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'classes' | 'subjects'>('classes');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'class' | 'subject'>('class');

  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      name: 'Class 10A',
      grade: '10',
      section: 'A',
      students: 32,
      classTeacher: 'Dr. Johnson',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'English'],
      schedule: {}
    },
    {
      id: '2',
      name: 'Class 10B',
      grade: '10',
      section: 'B',
      students: 28,
      classTeacher: 'Ms. Davis',
      subjects: ['Mathematics', 'Physics', 'Biology', 'English'],
      schedule: {}
    },
    {
      id: '3',
      name: 'Class 11A',
      grade: '11',
      section: 'A',
      students: 25,
      classTeacher: 'Dr. Wilson',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
      schedule: {}
    }
  ]);

  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Mathematics',
      code: 'MATH',
      description: 'Advanced Mathematics including Calculus and Algebra',
      classes: ['10A', '10B', '11A'],
      teachers: ['Dr. Johnson', 'Mr. Smith']
    },
    {
      id: '2',
      name: 'Physics',
      code: 'PHY',
      description: 'Classical and Modern Physics',
      classes: ['10A', '10B', '11A'],
      teachers: ['Mr. Smith', 'Dr. Brown']
    },
    {
      id: '3',
      name: 'Chemistry',
      code: 'CHEM',
      description: 'Organic and Inorganic Chemistry',
      classes: ['10A', '11A'],
      teachers: ['Dr. Wilson']
    },
    {
      id: '4',
      name: 'English',
      code: 'ENG',
      description: 'English Literature and Language',
      classes: ['10A', '10B'],
      teachers: ['Ms. Davis']
    }
  ]);

  const [newClass, setNewClass] = useState({
    name: '',
    grade: '',
    section: '',
    classTeacher: '',
    subjects: [] as string[]
  });

  const [newSubject, setNewSubject] = useState({
    name: '',
    code: '',
    description: '',
    classes: [] as string[],
    teachers: [] as string[]
  });

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    const classData: Class = {
      id: Date.now().toString(),
      name: `Class ${newClass.grade}${newClass.section}`,
      grade: newClass.grade,
      section: newClass.section,
      students: 0,
      classTeacher: newClass.classTeacher,
      subjects: newClass.subjects,
      schedule: {}
    };
    setClasses([...classes, classData]);
    setNewClass({ name: '', grade: '', section: '', classTeacher: '', subjects: [] });
    setShowAddModal(false);
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const subjectData: Subject = {
      id: Date.now().toString(),
      ...newSubject
    };
    setSubjects([...subjects, subjectData]);
    setNewSubject({ name: '', code: '', description: '', classes: [], teachers: [] });
    setShowAddModal(false);
  };

  const openAddModal = (type: 'class' | 'subject') => {
    setModalType(type);
    setShowAddModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
        <button
          onClick={() => setActiveTab('classes')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
            activeTab === 'classes'
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Classes</span>
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
            activeTab === 'subjects'
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Subjects</span>
        </button>
      </div>

      {/* Classes Tab */}
      {activeTab === 'classes' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Class Management
            </h3>
            <button
              onClick={() => openAddModal('class')}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Class</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <div key={classItem.id} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-white">{classItem.name}</h4>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-400 hover:text-blue-300 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Students:</span>
                    <span className="text-white font-medium">{classItem.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Class Teacher:</span>
                    <span className="text-white font-medium">{classItem.classTeacher}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-2">Subjects:</span>
                    <div className="flex flex-wrap gap-1">
                      {classItem.subjects.map((subject, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2 rounded-lg text-sm font-medium transition-colors">
                    Manage Schedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subjects Tab */}
      {activeTab === 'subjects' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              Subject Management
            </h3>
            <button
              onClick={() => openAddModal('subject')}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Subject</span>
            </button>
          </div>

          <div className="grid gap-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="p-6 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{subject.name}</h4>
                    <p className="text-sm text-gray-400">{subject.code}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-400 hover:text-blue-300 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{subject.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-400 text-sm block mb-2">Classes:</span>
                    <div className="flex flex-wrap gap-1">
                      {subject.classes.map((className, index) => (
                        <span key={index} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                          {className}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm block mb-2">Teachers:</span>
                    <div className="flex flex-wrap gap-1">
                      {subject.teachers.map((teacher, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                          {teacher}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-6">
              Add New {modalType === 'class' ? 'Class' : 'Subject'}
            </h3>
            
            {modalType === 'class' ? (
              <form onSubmit={handleAddClass} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Grade</label>
                    <input
                      type="text"
                      value={newClass.grade}
                      onChange={(e) => setNewClass({ ...newClass, grade: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Section</label>
                    <input
                      type="text"
                      value={newClass.section}
                      onChange={(e) => setNewClass({ ...newClass, section: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="A"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Class Teacher</label>
                  <input
                    type="text"
                    value={newClass.classTeacher}
                    onChange={(e) => setNewClass({ ...newClass, classTeacher: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Teacher name"
                    required
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Add Class
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAddSubject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject Name</label>
                  <input
                    type="text"
                    value={newSubject.name}
                    onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Mathematics"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject Code</label>
                  <input
                    type="text"
                    value={newSubject.code}
                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="MATH"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={newSubject.description}
                    onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Subject description..."
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Add Subject
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSubjectManagement;