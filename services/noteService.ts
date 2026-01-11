import { Note } from "@/models/note";
import { ServiceResponse } from "@/models/service-response";
import databaseService from "./databaseService";

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const colId = process.env.EXPO_PUBLIC_APPWRITE_NOTES_COLLECTION_ID!;

interface Error {
	error: any;
};

function isError (response: any): response is Error {
	return 'error' in response;
}

const noteService = {
	// Get notes
	async getNotes(): Promise<ServiceResponse<Note[]>> {
		return await databaseService.listDocuments<Note>(dbId, colId);
	},
	// Add note
	async addNote(text: string): Promise<ServiceResponse<Note>> {
		if (!text) {
			return { data: null, error: 'Note text can not be empty!' };
		}

		const data = { text };
		return await databaseService.createDocument<Note>(dbId, colId, data);
	},
	// Update note
	async updateNote(id: string, text: string) {
		if (!text) {
			return { data: null, error: 'Note text can not be empty!' };
		}

		const data = { text };
		return await databaseService.updateDocument<Note>(dbId, colId, id, data);
	},
	// Delete note
	async deleteNote (id: string) {
		return await databaseService.deleteDocument(dbId, colId, id);
	}
};

export default noteService;