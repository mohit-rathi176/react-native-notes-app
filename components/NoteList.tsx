import { Note } from "@/models/note";
import { FlatList, View } from "react-native";
import NoteItem from "./NoteItem";

interface NoteListProps {
	notes: Note[];
};

const NoteList = ({ notes }: NoteListProps) => {
	return (
		<View>
			<FlatList
				data={notes}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <NoteItem note={item} />}
			/>
		</View>
	);
};

export default NoteList;