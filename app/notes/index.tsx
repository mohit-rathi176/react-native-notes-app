import AddNoteModal from "@/components/AddNoteModal";
import NoteList from "@/components/NoteList";
import { Note } from "@/models/note";
import noteService from "@/services/noteService";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NoteScreen = () => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [newNote, setNewNote] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchNotes();
	}, []);

	const fetchNotes = async () => {
		setLoading(true);
		const response = await noteService.getNotes();
		
		if (response.error) {
			setError(response.error);
			Alert.alert('Error', response.error);
		} else {
			setNotes(response.data as unknown as Note[]);
			setError(null);
		}

		setLoading(false);
	}

	const addNote = async () => {
		if (newNote.trim() === '') return;

		const response = await noteService.addNote(newNote);

		if (response.error) {
			Alert.alert('Error', response.error);
		} else {
			setNotes([...notes, response.data!]);
		}

		setNewNote('');
		setModalVisible(false);
	};

	const editNote = async (id: string, text: string) => {
		if (!text.trim()) {
			Alert.alert('Error', 'Note text can not be empty!');
			return;
		}

		const response = await noteService.updateNote(id, text);

		if (response.error) {
			Alert.alert('Error', response.error);
		} else {
			setNotes((prevNotes) => prevNotes.map((note) => note.$id === id ? { ...note, text: response.data!.text } : note));
		}
	};

	const deleteNote = async (id: string) => {
		Alert.alert(
			'Delete Note',
			'Are you sure you want to delete this note?',
			[
				{
					text: 'Cancel',
					style: 'cancel'
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: async () => {
						const response = await noteService.deleteNote(id);
						if (response.error) {
							Alert.alert('Error', response.error);
						} else {
							setNotes(notes.filter(note => note.$id != id));
						}
					}
				}
			]
		);
		

	};

	return (
		<View style={styles.container}>
			{ loading ? (
				<ActivityIndicator size='large' color='#007bff' />
			) : (
				<>
					{ error && <Text style={styles.errorText}>{error}</Text> }
					<NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
				</>
			) }

			<TouchableOpacity
				style={styles.addButton}
				onPress={() => setModalVisible(true)}
			>
				<Text style={styles.addButtonText}>+ Add Note</Text>
			</TouchableOpacity>

			<AddNoteModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				newNote={newNote}
				setNewNote={setNewNote}
				addNote={addNote}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff'
	},
	addButton: {
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,
		backgroundColor: '#007bff',
		padding: 15,
		borderRadius: 8,
		alignItems: 'center'
	},
	addButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold'
	},
	errorText: {
		color: 'red',
		textAlign: 'center',
		marginBottom: 10,
		fontSize: 16
	}
});

export default NoteScreen;