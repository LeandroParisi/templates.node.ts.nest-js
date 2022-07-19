export interface DeleteUserByIdDatabaseGateway {
    deleteById(id: number): Promise<void>;
}

export const DeleteUserByIdDatabaseGateway = Symbol("DeleteUserByIdDatabaseGateway");
