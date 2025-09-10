import { User } from "firebase/auth";
import { TreeNode } from "@/types/Curriculum";

interface ProblemData {
  typeCode: string;
  statement: string;
  answer: string;
  explanation: string;
  difficulty?: string;
  suggestedPoints?: number;
  suggestedTime?: number;
  isPublic?: boolean;
  isActive?: boolean;
  subtopicId?: number;
  media?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

class ApiService {
  private async getAuthHeaders(user: User): Promise<Record<string, string>> {
    const token = await user.getIdToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    user?: User
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>
    };

    if (user) {
      const authHeaders = await this.getAuthHeaders(user);
      Object.assign(headers, authHeaders);
    }

    const response = await fetch(endpoint, {
      ...options,
      headers
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Curriculum API
  async getCurriculum(user: User) {
    return this.request('/api/curriculum', { method: 'GET' }, user);
  }

  async saveCurriculum(user: User, curriculum: TreeNode[]) {
    return this.request('/api/curriculum', {
      method: 'POST',
      body: JSON.stringify({ curriculum })
    }, user);
  }

  // Problem Types API
  async getProblemTypes(user: User) {
    return this.request('/api/problem-types', { method: 'GET' }, user);
  }

  // Problems API
  async createProblem(user: User, problemData: ProblemData) {
    return this.request('/api/problems', {
      method: 'POST',
      body: JSON.stringify(problemData)
    }, user);
  }

  // User API
  async getUserInfo(user: User) {
    return this.request('/api/user/info', { method: 'GET' }, user);
  }
}

export const apiService = new ApiService();