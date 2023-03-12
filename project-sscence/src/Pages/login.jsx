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
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

export function Login() {
  const toast = useToast();
  let [form, setForm] = React.useState({ email: "", password: "" });

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { isAuth, toggleAuth } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  let url = "https://mock-server-app-pzg9.onrender.com/signup";

  function getData(e) {
    e.preventDefault();
    axios
      .get(url)
      .then((res) => {
        let count = 0;
        let count1 = 0;
        res.data.forEach((el) => {
          if (el.email == form.email && el.password == form.password) {
          } else {
            count++;
          }
          count1++;
        });
        if (count === count1) {
          toast({
            title: "Wrong Credential",
            description: "Your password or email is incorrect",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Login Successfull",
            description: "You are succesfully logged in your account.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          toggleAuth(form.email);
        }
      })
      .catch((err) => console.log(err));
  }
  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Box pt={"80px"} w="100%" display="flex" justifyContent="center">
        <Flex w="40%" direction="column" justifyContent="center">
          <Center>
            {" "}
            <Text m="20px" fontWeight={"bold"} fontSize="25px">
              LOGIN HERE
            </Text>
          </Center>
          <form onSubmit={getData}>
            <Text marginLeft="10px" alignSelf="flex-start" mb="8px">
              Email :
            </Text>
            <Input
              name="email"
              type="email"
              required
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
      <Box w="100%" display="flex" justifyContent="center">
        <Flex w="40%" direction="column" justifyContent="center">
          <Text m="10px" display={"flex"}>
            Not have Account?
            <span
              style={{ marginLeft: "5px", fontWeight: "bold", color: "blue" }}
            >
              <Link to="/signup"> Create acount here </Link>
            </span>{" "}
          </Text>
        </Flex>
      </Box>
    </>
  );
}
