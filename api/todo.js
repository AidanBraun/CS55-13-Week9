import { db } from "../firebase";
import {
collection,
addDoc,
updateDoc,
doc,
deleteDoc,
} from "firebase/firestore";

const addTodo = async ({ userId, title, description, status }) => {
  try {
    await addDoc(collection(db, "todo"), {
      user: userId,
      title: title,
      description: description,
      status: status,
      createdAt: new Date().getTime(),
    });
  } catch (err) {
    console.log(err);
  }
};

const toggleTodoStatus = async ({ docId, status }) => {
try {
const todoRef = doc(db, "todo", docId);
await updateDoc(todoRef, {
status,
});
} catch (err) {
console.log(err);
}
};

const deleteTodo = async (docId) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};



const addNote = async ({userId, title, description}) => {
  try {
    await addDoc(collection(db, "events"), {
      user: userId,
      eventDate: title,
      description: description,
      createdAt: new Date().getTime(),
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteNote = async (docId) => {
  try {
    const todoRef = doc(db, "events", docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};

const addContact = async ({userId, firstN, lastN, phoneNumber, email}) => {
  try {
    await addDoc(collection(db, "contacts"), {
      user: userId,
      firstName: firstN,
      lastName: lastN,
      phoneNum: phoneNumber,
      emailAddress: email,
      createdAt: new Date().getTime(),
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteContact = async (docId) => {
  try {
    const contactRef = doc(db, "contacts", docId);
    await deleteDoc(contactRef);
  } catch (err) {
    console.log(err);
  }
};



export { addTodo, toggleTodoStatus, deleteTodo, addNote, deleteNote, addContact, deleteContact };