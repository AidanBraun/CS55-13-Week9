import React from "react";
import {
Box,
Input,
Button,
Textarea,
Stack,
Select,
useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addNote } from "../api/todo";

const AddNote = () => {
const [title, setTitle] = React.useState("");
const [description, setDescription] = React.useState("");
const [isLoading, setIsLoading] = React.useState(false);
const toast = useToast();
const { isLoggedIn, user } = useAuth();
const handleNoteCreate = async () => {
if (!isLoggedIn) {
toast({
title: "You must be logged in to create a note",
status: "error",
duration: 9000,
isClosable: true,
});
return;
}
setIsLoading(true);
const note = {
title,
description,
userId: user.uid,
};
await addNote(note);
setIsLoading(false);
setTitle("");
setDescription("");
toast({ title: "Note created successfully", status: "success" });
};
    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input 
                    placeholder="Note Title"
                    value={title}
                    onChange={ (e) => setTitle( e.target.value ) }
                />
                <Textarea
                    placeholder="Note Description"
                    value={description}
                    onChange={ (e) => setDescription(e.target.value) }
                />
                <Button
                    onClick={ () => handleNoteCreate() }
                    disabled={ title.length < 1 || description.length <1 || isLoading }
                    colorScheme="teal"
                    variant="solid"
                >
                    Add Note
                </Button>
            </Stack>
        </Box>
    );
};
export default AddNote;