import axios from "axios";
import { UserDTO } from "../dtos/user.dto";

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:3002";

export async function getUserByEmail(email: string): Promise<UserDTO | null> {
    try {
        const response = await axios.get(`${USER_SERVICE_URL}/users/email/${email}`);
        return response.data;
    } catch (error) {
        return null;
    }
}

export async function getUserById(id: number): Promise<UserDTO | null> {
    try {
        const response = await axios.get(`${USER_SERVICE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        return null;
    }
}
