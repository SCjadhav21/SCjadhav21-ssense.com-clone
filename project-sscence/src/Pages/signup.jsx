import {
  Text,
  Button,
  InputGroup,
  InputRightElement,
  Input,
  Flex,
  Box,
  useToast,
  Center,
} from "@chakra-ui/react";
import React from "react";

import axios from "axios";
import { Navigate } from "react-router-dom";

export function Signup() {
  const toast = useToast();
  let [form, setForm] = React.useState({ email: "", password: "" });
  const [signup, setSignup] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  function getData(e) {
    e.preventDefault();

    axios
      .post("https://mock-server-app-pzg9.onrender.com/signup", {
        email: form.email,
        password: form.password,
      })
      .then((res) => {
        if (res.data) {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setSignup(true);
        } else {
          toast({
            title: "Error while creating Account.",
            description: "We've not able to created your account for you.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }).catch = (err) => {
      toast({
        title: "Error while creating Account.",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    };
  }
  if (signup) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Box pt={"80px"} w="100%" display="flex" justifyContent="center">
        <Flex w="40%" direction="column" justifyContent="center">
          <Center>
            {" "}
            <Text m="20px" fontWeight={"bold"} fontSize="25px">
              CREATE ACCOUNT
            </Text>
          </Center>
          <form onSubmit={getData}>
            <Text marginLeft="10px" alignSelf="flex-start" mb="8px">
              Email :
            </Text>
            <Input
              required
              name="email"
              type="email"
              onChange={handleChange}
              border="2px solid #000000"
              placeholder="Enter Email"
              m="0px 10px 10px 10px"
            />
            <Text marginLeft="10px" alignSelf="flex-start" mb="8px">
              Password :
            </Text>
            <InputGroup w="full" m="0px 10px 10px 10px">
              <Input
                required
                name="password"
                onChange={handleChange}
                border="2px solid #000000"
                placeholder="Enter Password"
                pr="4.5rem"
                type={show ? "text" : "password"}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button type="submit" bg="black" color="#FFF" m="10px" w="full">
              Continue
            </Button>
          </form>
        </Flex>
      </Box>
    </>
  );
}
