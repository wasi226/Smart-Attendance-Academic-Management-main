const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  // Auth methods
  async login(credentials: any) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Attendance methods
  async recordAttendance(attendanceData: any) {
    return this.request('/attendance', {
      method: 'POST',
      body: JSON.stringify(attendanceData),
    });
  }

  async getStudentAttendance(studentId: string) {
    return this.request(`/attendance/student/${studentId}`);
  }

  // Assignment methods
  async createAssignment(formData: FormData) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/assignments`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async getClassAssignments(className: string) {
    return this.request(`/assignments/class/${className}`);
  }

  // Correction request methods
  async createCorrectionRequest(requestData: any) {
    return this.request('/correction-requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async getStudentCorrectionRequests(studentId: string) {
    return this.request(`/correction-requests/student/${studentId}`);
  }

  // User methods
  async getUsers(filters: any = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/users?${queryParams}`);
  }
}

export const apiService = new ApiService();