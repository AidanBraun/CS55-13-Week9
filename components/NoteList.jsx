import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaTrash } from "react-icons/fa";
import { deleteNote } from "../api/todo";

const NoteList = () => {
  const [theNotes, setNotes] = React.useState([]);
  const { user } = useAuth();
  const toast = useToast();
  const refreshData = () => {
    if (!user) {
      setNotes([]);
      return;
    }
    const q = query(collection(db, "events"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setNotes(ar);
    });
  };
  useEffect(() => {
    refreshData();
    <em>// eslint-disable-next-line react-hooks/exhaustive-deps</em>
  }, [user, refreshData]);
  const handleNoteDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this event?")) {
      deleteNote(id);
      toast({ title: "Event deleted successfully", status: "success" });
    }
  };

  return (
    <Box mt={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {theNotes &&
          theNotes.map(
            (notes) => (
              <Box
                p={3}
                boxShadow="2xl"
                shadow={"dark-lg"}
                transition="0.2s"
                _hover={{ boxShadow: "sm" }}
                key={notes.id}
              >
                <Heading as="h3" fontSize={"xl"}>
                  {notes.eventDate}
                  {" "}
                  <Badge
                    color="red.500"
                    bg="inherit"
                    transition={"0.2s"}
                    _hover={{
                      bg: "inherit",
                      transform: "scale(1.2)",
                    }}
                    float="right"
                    size="xs"
                    onClick={() => handleNoteDelete(notes.id)}
                  >
                    <FaTrash />
                  </Badge>
                </Heading>
                <Text>
                  {notes.description}
                </Text>
              </Box>
            )
          )
        }
      </SimpleGrid>
    </Box>
  );
};
export default NoteList;