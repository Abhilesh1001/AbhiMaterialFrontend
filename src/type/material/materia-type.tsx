export type MaterialData = {
    s_no: number;
    material_name: string;
    material_group: string;
    unit: string;
    user: string|number;
    // Add other properties as needed
};

export type QueryResponse = MaterialData[];