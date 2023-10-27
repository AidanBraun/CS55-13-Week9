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
import { deleteContact } from "../api/todo";

const ContactList = () => {
  const [theContacts, setContacts] = React.useState([]);
  const { user } = useAuth();
  const toast = useToast();
  /*
  const refreshData = () => {
    if (!user) {
      setContacts([]);
      return;
    }
    const q = query(collection(db, "contacts"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setContacts(ar);
    });
  };
  */
 
  useEffect(() => {
    //refreshData();
    //<em>// eslint-disable-next-line react-hooks/exhaustive-deps</em>

    if (!user) {
      setContacts([]);
      return;
    }
    const q = query(collection(db, "contacts"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setContacts(ar);
    });

  }, [user]);

  const handleContactDelete = async (id) => {
    if (confirm("Are you sure you wanna delete this contact?")) {
      deleteContact(id);
      toast({ title: "Contact deleted successfully", status: "success" });
    }
  };

  return (
    <Box mt={5}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {theContacts &&
          theContacts.map(
            (contacts) => (
              <Box
                p={3}
                boxShadow="2xl"
                shadow={"dark-lg"}
                transition="0.2s"
                _hover={{ boxShadow: "sm" }}
                key={contacts.id}
              >
                <Heading as="h3" fontSize={"xl"}>
                  {contacts.firstName}
                  {" "}
                  {contacts.lastName}
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
                    onClick={() => handleContactDelete(contacts.id)}
                  >
                    <FaTrash />
                  </Badge>
                </Heading>
                <Text>
                  {contacts.phoneNum}
                  <br></br>
                  {contacts.emailAddress}
                </Text>
              </Box>
            )
          )
        }
      </SimpleGrid>
    </Box>
  );
};
export default ContactList;