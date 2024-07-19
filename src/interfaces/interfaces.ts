// Define interfaces Here
export interface RouteParams extends Record<string, string | undefined> {
    id: string;
}

export interface Todos {
    id: string;
    title: string;
    completed: boolean;
}