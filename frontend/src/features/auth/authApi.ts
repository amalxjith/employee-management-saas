import API from "../../services/api";

export const loginRequest = async (email: string, password: string) => {
  
    const response = await API.post("/auth/login", {email, password});
    return response.data;
};

export const registerRequest = async (name: string,email: string,password: string) => {
    
  const response = await API.post("/auth/register", {name,email,password});
  return response.data;
};
