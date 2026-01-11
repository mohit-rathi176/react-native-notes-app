import { Note } from "@/models/note";
import { FlatList, View } from "react-native";
import NoteItem from "./NoteItem";

interface NoteListProps {
	notes: Note[];
	onDelete: (id: string) => void;
	onEdit: (id: string, text: string) => void;
};

const NoteList = ({ notes, onDelete, onEdit }: NoteListProps) => {
	return (
		<View>
			<FlatList
				data={notes}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <NoteItem note={item} onDelete={onDelete} onEdit={onEdit} />}
			/>
		</View>
	);
};

export default NoteList;