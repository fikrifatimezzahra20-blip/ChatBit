export type User = {
    id: number;
    fullname: string;
    email: string;
    role: "client" | "agent";
    is_online?: boolean;
};