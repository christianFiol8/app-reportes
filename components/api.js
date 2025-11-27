// api.js
const API_URL = 'http://192.168.1.82:3000'; 

export const loginUser = async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Error de Login');
    return await response.json();
};

export const registerUser = async (name, email, password, city) => {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, city })
    });
    if (!response.ok) throw new Error('Error de Registro');
    return await response.json();
};

export const getReports = async () => {
    try {
        const response = await fetch(`${API_URL}/reports`);
        return await response.json();
    } catch (e) {
        console.error(e);
        return [];
    }
};

export const createReport = async (reportData) => {
    const response = await fetch(`${API_URL}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
    });
    if (!response.ok) throw new Error('Error al enviar reporte');
    return await response.json();
};