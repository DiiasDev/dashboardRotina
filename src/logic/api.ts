const API_BASE_URL = "http://localhost:5000"

export const fetchTasks = async () => {
    const response = await fetch(`${API_BASE_URL}/tasks`)
    return response.json();
};

export const testDatabase = async () => {
    const response = await fetch(`${API_BASE_URL}/teste-db`);
    return response.text();
}