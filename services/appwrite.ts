import { Platform } from 'react-native';
import { Client, Databases } from 'react-native-appwrite';

interface AppriteConfig {
	endpoint: string;
	projectId: string;
	db: string;
	col: Record<string, string>;
};

const config: AppriteConfig = {
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
	projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
	db: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
	col: {
		notes: process.env.EXPO_PUBLIC_APPWRITE_NOTES_COLLECTION_ID!
	}
};

const client = new Client()
	.setEndpoint(config.endpoint)
	.setProject(config.projectId);

switch (Platform.OS) {
	case 'ios':
		client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID!);
		break;
	case 'android':
		client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME!);
		break;
}

const database = new Databases(client);

export { client, config, database };

