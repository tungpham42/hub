export interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
  icon?: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Tag {
  id: string;
  name: string;
}
