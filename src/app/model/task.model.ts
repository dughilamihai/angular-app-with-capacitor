export interface Task {
    id: number;
    user_id: number; // ID-ul utilizatorului care a creat task-ul.    
    title: string;
    description: string;
    route: string; // Ruta internă în aplicație, de exemplu, '/tasks' sau '/accounts/:id'.    
    datetime: Date; // Include atât data, cât și ora.
  }
  