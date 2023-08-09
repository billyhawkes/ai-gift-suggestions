import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

// Contact schema
export const ContactSchema = z.object({
	id: z.string(),
	name: z.string(),
	interests: z.string(),
	relationship: z.string(),
});
// Contact type
export type Contact = z.infer<typeof ContactSchema>;

// Update contact schema
export const UpdateContactSchema = z.object({
	name: ContactSchema.shape.name,
	interests: ContactSchema.shape.interests,
	relationship: ContactSchema.shape.relationship,
});
// Update contact type
export type UpdateContact = z.infer<typeof UpdateContactSchema>;

// Sets the contacts in async storage
export const setContacts = async (contacts: Contact[]) => {
	const jsonValue = JSON.stringify(contacts);
	await AsyncStorage.setItem("contacts", jsonValue);
};

// Gets the contacts from async storage
export const getContacts = async () => {
	const jsonValue = await AsyncStorage.getItem("contacts");
	if (jsonValue != null) {
		const data = JSON.parse(jsonValue);
		return ContactSchema.array().parse(data);
	} else {
		return [];
	}
};

// Creates a new contact
export const createContact = async () => {
	const contacts = await getContacts();
	const newContact: Contact = {
		id: uuidv4(),
		name: "",
		interests: "",
		relationship: "",
	};
	await setContacts([...contacts, newContact]);
	return newContact;
};

// Gets a contact by id
export const getContact = async (id: string) => {
	const contacts = await getContacts();
	return contacts.find((contact) => contact.id === id);
};

// Updates a contact by id
export const updateContact = async ({ id, data }: { id: string; data: UpdateContact }) => {
	const contacts = await getContacts();
	const index = contacts.findIndex((contact) => contact.id === id);
	if (index === -1) {
		throw new Error("Contact not found");
	}
	contacts[index] = { id, ...data };
	await setContacts(contacts);
	return contacts[index];
};

// Deletes a contact by id
export const deleteContact = async (id: string) => {
	const contacts = await getContacts();
	const index = contacts.findIndex((contact) => contact.id === id);
	if (index === -1) {
		throw new Error("Contact not found");
	}
	contacts.splice(index, 1);
	await setContacts(contacts);
};
