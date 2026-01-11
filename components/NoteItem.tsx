import { Note } from "@/models/note";
import { StyleSheet, Text, View } from "react-native";

interface NoteItemProps {
	note: Note;
};

const NoteItem = ({ note }: NoteItemProps) => {
	return (
		<View style={styles.noteItem}>
			<Text style={styles.noteText}>{note.text}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	noteItem: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#f5f5f5',
		padding: 15,
		borderRadius: 5,
		marginVertical: 5
	},
	noteText: {
		fontSize: 18
	},
});

export default NoteItem;