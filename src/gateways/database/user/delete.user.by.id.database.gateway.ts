export interface DeleteUserByIdDatabaseGateway {
    deleteById(id: number): Promise<void>;
}

export const DeleteUserByIdDatabaseGatewayKey = Symbol("DeleteUserByIdDatabaseGateway");
