export type Techs =
  | "SPRING_BOOT"
  | "REACT"
  | "NODE_JS"
  | "DOCKER"
  | "TYPESCRIPT"
  | "JAVA"
  | "JAVASCRIPT"
  | "REACT_NATIVE"
  | "MYSQL"
  | "POSTGRESQL"
  | "LARAVEL"
  | "PHP"
  | "CODEIGNITER"
  | "NEXT_JS";

export interface TechsData {
  [key: string]: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export interface RoadMapItem {
  year: string;
  month?: string;
  title: string;
  description: string;
  icon: string;
  highlight?: boolean;
}

export interface ChatMessage {
  id: string;
  from: "user" | "bot";
  text: string;
  timestamp: Date;
}
