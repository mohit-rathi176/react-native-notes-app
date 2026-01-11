import { ServiceResponse } from "@/models/service-response";
import { ID, Models } from "react-native-appwrite";
import { database } from "./appwrite";

const databaseService = {
	// List documents
	async listDocuments<T extends Models.Document>(dbId: string, colId: string): Promise<ServiceResponse<T[]>> {
		try {
			const response = await database.listDocuments(dbId, colId);
			return { data: (response.documents ?? []) as unknown as T[], error: null };
		} catch (error) {
			console.error('Error fetching documents: ', error);
			const message = error instanceof Error ? error.message : 'An unknown error occurred';
			return { data: null, error: message };
		}
	},
	// Create document
	async createDocument<T extends Models.Document>(dbId: string, colId: string, data: object, id: string = ID.unique()): Promise<ServiceResponse<T>> {
		try {
			const result = await database.createDocument(dbId, colId, id, data);
			return { data: result as unknown as T, error: null };
		} catch (error) {
			console.error('Error creating document', error);
			const message = error instanceof Error ? error.message : 'An unknown error occurred';
			return { data: null, error: message };
		}
	},
	// Update document
	async updateDocument<T extends Models.Document>(dbId: string, colId: string, id: string, data: object): Promise<ServiceResponse<T>> {
		try {
			const result = await database.updateDocument(dbId, colId, id, data);
			return { data: result as unknown as T, error: null };
		} catch (error) {
			console.error('Error updating document', error);
			const message = error instanceof Error ? error.message : 'An unknown error occurred';
			return { data: null, error: message };
		}
	},
	// Delete document
	async deleteDocument(dbId: string, colId: string, id: string): Promise<ServiceResponse<{}>> {
		try {
			const result = await database.deleteDocument(dbId, colId, id);
			return { data: result, error: null };
		} catch (error) {
			console.error('Error deleting document', error);
			const message = error instanceof Error ? error.message : 'An unknown error occurred';
			return { data: null, error: message };
		}
	}
};

export default databaseService;