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
import { addContact } from "../api/todo";

const AddContact = () => {
  const [firstN, setFirst] = React.useState("");
  const [lastN, setLast] = React.useState("");
  const [phoneNumber, setPhoneNum] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const { isLoggedIn, user } = useAuth();
  const handleContactCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create an event",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    const contact = {
      firstN,
      lastN,
      phoneNumber,
      email,
      userId: user.uid,
    };
    await addContact(contact);
    setIsLoading(false);
    setFirst("");
    setLast("");
    setPhoneNum("");
    setEmail("");
    toast({ title: "Contact created successfully", status: "success" });
  };
  return (
    <Box w="40%" margin={"0 auto"} display="block" mt={5}>
      <Stack direction="column">
        <Input
          placeholder="First Name"
          value={firstN}
          onChange={(e) => setFirst(e.target.value)}
        />
        <Input
          placeholder="Last Name"
          value={lastN}
          onChange={(e) => setLast(e.target.value)}
        />
        <Input
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNum(e.target.value)}
        />
        <Input
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          onClick={() => handleContactCreate()}
          disabled={firstN.length < 1 || lastN.length < 1 || phoneNumber.length < 1 || email.length < 1 || isLoading}
          colorScheme="teal"
          variant="solid"
        >
          Add Contact
        </Button>
      </Stack>
    </Box>
  );
};
export default AddContact;