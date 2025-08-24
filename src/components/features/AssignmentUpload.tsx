import React, { useState } from 'react';
import { Upload, FileText, Calendar, Users, Download, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { apiService } from '../../services/api';

const AssignmentUpload: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    dueDate: '',
    maxMarks: '',
    instructions: ''
  });

  const assignments = [
    {
      id: 1,
      title: 'Calculus Problem Set 5',
      subject: 'Mathematics',
      class: '10A',
      dueDate: '2025-01-20',
      submissions: 28,
      totalStudents: 32,
      status: 'active'
    },
    {
      id: 2,
      title: 'Wave Motion Lab Report',
      subject: 'Physics',
      class: '10B',
      dueDate: '2025-01-18',
      submissions: 25,
      totalStudents: 28,
      status: 'active'
    },
    {
      id: 3,
      title: 'Organic Chemistry Quiz',
      subject: 'Chemistry',
      class: '10A',
      dueDate: '2025-01-15',
      submissions: 30,
      totalStudents: 32,
      status: 'completed'
    }
  ];

  const studyMaterials = [
    {
      id: 1,
      title: 'Calculus Fundamentals',
      subject: 'Mathematics',
      type: 'PDF',
      size: '2.4 MB',
      downloads: 156,
      uploadDate: '2025-01-10'
    },
    {
      id: 2,
      title: 'Physics Lab Manual',
      subject: 'Physics',
      type: 'PDF',
      size: '5.8 MB',
      downloads: 89,
      uploadDate: '2025-01-08'
    },
    {
      id: 3,
      title: 'Chemistry Reference Guide',
      subject: 'Chemistry',
      type: 'PDF',
      size: '3.2 MB',
      downloads: 124,
      uploadDate: '2025-01-05'
    }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAssignmentData({
      ...assignmentData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', assignmentData.title);
    formData.append('description', assignmentData.description);
    formData.append('subject', assignmentData.subject);
    formData.append('class', assignmentData.class);
    formData.append('dueDate', assignmentData.dueDate);
    formData.append('maxMarks', assignmentData.maxMarks);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    apiService.createAssignment(formData)
      .then(() => {
        alert('Assignment uploaded successfully!');
        setSelectedFile(null);
        setAssignmentData({
          title: '',
          description: '',
          subject: '',
          class: '',
          dueDate: '',
          maxMarks: '',
          instructions: ''
        });
      })
      .catch(error => {
        console.error('Failed to upload assignment:', error);
        alert('Failed to upload assignment. Please try again.');
      });
  };

  return (
    <div className="space-y-8">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
            activeTab === 'upload'
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <Plus className="w-5 h-5" />
          <span>Upload Assignment</span>
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
            activeTab === 'manage'
              ? 'bg-white/20 text-white shadow-lg'
              : 'text-gray-400 hover:text-white hover:bg-white/10'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Manage Content</span>
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <Upload className="w-7 h-7 mr-3" />
            Upload Assignment or Study Material
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={assignmentData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter assignment title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={assignmentData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="English">English</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Class *
                </label>
                <select
                  name="class"
                  value={assignmentData.class}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Class</option>
                  <option value="10A">Class 10A</option>
                  <option value="10B">Class 10B</option>
                  <option value="10C">Class 10C</option>
                  <option value="11A">Class 11A</option>
                  <option value="11B">Class 11B</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={assignmentData.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={assignmentData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter assignment description and requirements"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upload File
              </label>
              <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">
                  Drag and drop your file here, or click to browse
                </p>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-colors"
                >
                  Choose File
                </label>
                {selectedFile && (
                  <p className="mt-4 text-green-400">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                Upload & Publish
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Manage Tab */}
      {activeTab === 'manage' && (
        <div className="space-y-8">
          {/* Active Assignments */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2" />
              Active Assignments
            </h3>
            
            <div className="grid gap-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{assignment.title}</h4>
                      <p className="text-sm text-gray-400">
                        {assignment.subject} • {assignment.class} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        assignment.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Submissions: {assignment.submissions}/{assignment.totalStudents}</span>
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-400 hover:text-blue-300 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-400 hover:text-green-300 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Materials */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-2" />
              Study Materials
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studyMaterials.map((material) => (
                <div key={material.id} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{material.title}</h4>
                      <p className="text-sm text-gray-400">{material.subject}</p>
                    </div>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {material.type}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-xs text-gray-400 mb-4">
                    <div className="flex justify-between">
                      <span>Size:</span>
                      <span>{material.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Downloads:</span>
                      <span>{material.downloads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Uploaded:</span>
                      <span>{new Date(material.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium transition-colors">
                      <Download className="w-4 h-4 inline mr-1" />
                      Download
                    </button>
                    <button className="p-2 text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentUpload;