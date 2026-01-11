import { Note } from "@/models/note";
import { FontAwesome } from '@expo/vector-icons';
import { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface NoteItemProps {
	note: Note;
	onDelete: (id: string) => void;
	onEdit: (id: string, text: string) => void;
};

const NoteItem = ({ note, onDelete, onEdit }: NoteItemProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState(note.text);

	const inputRef = useRef<TextInput | null>(null);

	const handleSave = () => {
		if (editedText.trim() === '') return;
		onEdit(note.$id, editedText);
		setIsEditing(false);
	};

	const onCancel = () => {
		setIsEditing(false);
		setEditedText(note.text);
	};

	return (
		<View style={styles.noteItem}>
			{ isEditing ? (
				<TextInput
					ref={inputRef}
					style={styles.input}
					value={editedText}
					onChangeText={setEditedText}
					autoFocus
					onSubmitEditing={handleSave}
					returnKeyType='done'
				/>
			) : (
				<Text style={styles.noteText}>{note.text}</Text>
			) }

			<View style={styles.noteActions}>
				{ isEditing ? (
					<TouchableOpacity
						onPress={() => {
							handleSave();
							inputRef.current?.blur();
						}}
					>
						<FontAwesome name='check' size={24} color='green' />
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						onPress={() => setIsEditing(true)}
					>
						<FontAwesome name='pencil' size={24} color='#007bff' />
					</TouchableOpacity>
				) }
				{ isEditing ? (
					<TouchableOpacity onPress={onCancel}>
						<FontAwesome name='close' size={24} color='red' />
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => onDelete(note.$id)}>
						<FontAwesome name='trash' size={24} color='red' />
					</TouchableOpacity>
				) }
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	noteItem: {
		display: 'flex',
		flexDirection: 'row',
		gap: 12,
		justifyContent: 'space-between',
		backgroundColor: '#f5f5f5',
		padding: 15,
		borderRadius: 5,
		marginVertical: 5
	},
	noteText: {
		fontSize: 18,
		flexGrow: 1,
		flexShrink: 1
	},
	input: {
		flexGrow: 1,
		flexShrink: 1
	},
	noteActions: {
		display: 'flex',
		flexDirection: 'row',
		gap: 12
	}
});

export default NoteItem;