import { Container } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import AddTodo from "../components/AddTodo";
import AddNote from "../components/AddNote";
import AddContact from "../components/AddContact";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import NoteList from "../components/NoteList";
import ContactList from "../components/ContactList";
export default function Home() {
return (
<Container maxW="7xl">
<Auth />

<Tabs>
<TabList>
    <Tab>To-Dos</Tab>
    <Tab>Events</Tab>
    <Tab>Contacts</Tab>
</TabList>

<TabPanels>
<TabPanel>
    <AddTodo />
    <TodoList />
</TabPanel>
<TabPanel>
    <AddNote />
    <NoteList />
</TabPanel>
<TabPanel>
    <AddContact />
    <ContactList />
</TabPanel>    
</TabPanels>
</Tabs>

</Container>
);
}