declare namespace Express { 
  export interface Request { 
    user: { 
      id: number; 
      email: string; 
      role: string; 
      password: string; 
      createdAt?: string; 
      updatedAt?: string; 
      iat?: number; 
    } | any; 
  } 
}
