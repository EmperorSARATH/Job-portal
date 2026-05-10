export interface JobFormData {
  title: string;
  description: string;
  taskSize: "SMALL" | "MID" | "LARGE";
  skills: Skill[];
}

interface Skill {
    id: string;
    name: string;
    category: string;
}


export interface JobDetail {
    objectId: string;
    title: string;
    description: string;
    companyName: string;
    location: string;
    salary?: number; // optional
    applied:boolean;
}
