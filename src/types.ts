export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Design Tools' | 'Soft Skills';
  level: number; // percentage 0-100
  iconName: string;
  description: string;
  tags: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username: string;
  color: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
