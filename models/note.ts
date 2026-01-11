import { Models } from "react-native-appwrite";

export interface Note extends Models.Document {
	text: string;
}