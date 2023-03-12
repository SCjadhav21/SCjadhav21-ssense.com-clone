import {
  Show,
  MenuButton,
  Menu,
  IconButton,
  MenuList,
  Select,
  Popover,
  PopoverTrigger,
  MenuItem,
  Flex,
  Box,
  Portal,
  Button,
  Input,
  PopoverCloseButton,
  PopoverBody,
  PopoverContent,
  PopoverArrow,
  Spacer,
  Img,
  Center,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
export function Navbar() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isAuth, toggleAuth, change } = useContext(AuthContext);
  const [data, setData] = React.useState(0);
  const [input, setInput] = React.useState("");
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    fetch("https://mock-server-app-pzg9.onrender.com/singleProduct")
      .then((res) => res.json())
      .then((res) => setData(res.length))
      .catch((err) => console.log(err));
  }, [change]);
  function toggleState() {
    toggleAuth();

    return;
  }

  const handeChange = (value) => {
    if (value === "mens") {
      navigate("/mens");
    } else if (value === "womens") {
      navigate("/womens");
    } else {
      navigate("/everything-else");
    }
  };

  const handelSearch = () => {
    if (value === "mens") {
      setInput("");
      navigate("/mens", { state: { data: input } });
    } else if (value === "womens") {
      setInput("");
      navigate("/womens", { state: { data: input } });
    } else {
      setInput("");
      navigate("/everything-else", { state: { data: input } });
    }
  };
  return (
    <>
      <Show above="md">
        <Box w="100%" position={"fixed"} zIndex={10}>
          <Flex
            fontWeight={"bold"}
            bgGradient={[
              "linear(to-tr, teal.300, yellow.600)",
              "linear(to-t, blue.200, teal.500)",
              "linear(to-b, orange.100, purple.400)",
            ]}
            p="10px"
          >
            <Box fontSize="11px" m="10px" w="30%">
              <Flex>
                {" "}
                <Box margin="10px">
                  <Link to="/mens">MENSWEAR</Link>
                </Box>
                <Box margin="10px">
                  <Link to="/womens">WOMENSWEAR</Link>
                </Box>
                <Box margin="10px">
                  <Link to="/everything-else">EVERYTINKG-ELSE</Link>
                </Box>
              </Flex>
            </Box>

            <Spacer />
            <Center fontWeight={"bold"}>
              <Link to="/">SSENSE</Link>
            </Center>

            <Spacer />
            <Box fontSize="11px" m="10px" w="30%">
              <Flex justifyContent="flex-end">
                {" "}
                <Box margin="10px">
                  <Popover>
                    <PopoverTrigger>
                      <Link>SEARCH</Link>
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <Select
                          onChange={(e) => {
                            setValue(e.target.value);
                            handeChange(e.target.value);
                          }}
                          width="80%"
                          placeholder="Select option"
                        >
                          <option value="mens">MENSWEAR</option>
                          <option value="womens">WOMENSWEAR</option>
                          <option value="other">EVERYTINKG-ELSE</option>
                        </Select>
                        <PopoverCloseButton
                          margin="5px"
                          // fontSize="18px"
                          variant="outline"
                        />
                        <PopoverBody>
                          <Flex>
                            <Input
                              value={input}
                              onChange={(e) => setInput(e.target.value)}
                              placeholder="SEARCH HERE"
                              margin="10px"
                              size="md"
                            />
                            <IconButton
                              margin="10px"
                              fontSize="18px"
                              variant="outline"
                              aria-label="Search database"
                              size="md"
                              onClick={handelSearch}
                              icon={<SearchIcon />}
                            />
                          </Flex>
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                </Box>
                <Box margin="10px">
                  {isAuth ? (
                    <Link
                      color="white"
                      bg="none"
                      onClick={() => {
                        toggleState();
                      }}
                    >
                      LOGOUT
                    </Link>
                  ) : (
                    <Link to="/login">LOGIN</Link>
                  )}
                </Box>
                <Box margin="10px">
                  <Link to="/cart">SHOPING_BAG({data})</Link>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Show>
      <Show below="md">
        <Box
          position="fixed"
          zIndex={10}
          w="100%"
          bgGradient={"linear(to-b, orange.100, purple.400)"}
          // bgColor="red"
          // bg="white"
        >
          <Flex p="10px">
            <Box>
              <Menu>
                <MenuButton
                  margin="10px"
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem>
                    <Link to="/mens">MENSWEAR</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="./womens">WOMENSWEAR</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/everything-else">EVERYTINKG-ELSE</Link>
                  </MenuItem>

                  <MenuItem>
                    {isAuth ? (
                      <button
                        bg="none"
                        onClick={() => {
                          toggleState();
                        }}
                      >
                        LOGOUT
                      </button>
                    ) : (
                      <Link to="/login">LOGIN</Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    <Link to="/cart">SHOPING_BAG({data})</Link>
                  </MenuItem>
                </MenuList>
              </Menu>

              <Popover>
                <PopoverTrigger>
                  <IconButton
                    margin="10px"
                    fontSize="18px"
                    variant="outline"
                    aria-label="Search database"
                    size="md"
                    icon={<SearchIcon />}
                  />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverArrow />
                    <Select
                      onChange={(e) => {
                        setValue(e.target.value);
                        handeChange(e.target.value);
                      }}
                      width="80%"
                      placeholder="Select option"
                    >
                      <option value="mens">MENSWEAR</option>
                      <option value="womens">WOMENSWEAR</option>
                      <option value="other">EVERYTINKG-ELSE</option>
                    </Select>
                    <PopoverCloseButton
                      margin="5px"
                      // fontSize="18px"
                      variant="outline"
                    />
                    <PopoverBody>
                      <Flex>
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="SEARCH HERE"
                          margin="10px"
                          size="md"
                        />
                        <IconButton
                          onClick={handelSearch}
                          margin="10px"
                          fontSize="18px"
                          variant="outline"
                          aria-label="Search database"
                          size="md"
                          icon={<SearchIcon />}
                        />
                      </Flex>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Box>
            <Spacer />
            <Center fontWeight={"bold"}>
              {" "}
              <Link to="/">SSENSE</Link>
            </Center>
            <Spacer />
            <Box>
              <Button margin="10px" padding="0px">
                {isAuth ? (
                  <Link to="/login">
                    <Img
                      onClick={() => {
                        toggleState();
                      }}
                      fontSize="18px"
                      size="md"
                      width="25px"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8KGl_KSisz6hjoKP5iBpmUJmOVnqglWkCCCunX-b10HJ-HaLtnhZKukedAzDRvpNH4bc&usqp=CAU"
                    ></Img>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Img
                      fontSize="18px"
                      size="md"
                      width="25px"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8KGl_KSisz6hjoKP5iBpmUJmOVnqglWkCCCunX-b10HJ-HaLtnhZKukedAzDRvpNH4bc&usqp=CAU"
                    ></Img>
                  </Link>
                )}
              </Button>
              <Button margin="10px" padding="0px">
                <Link to="/cart">
                  <Img
                    fontSize="18px"
                    size="md"
                    width="25px"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMsq2lipdJDei07_jKRH5v4WlTzgQ2YuSEQdoZj4BaWzf1NBmOkss3pbScJairRJuk8E0&usqp=CAU"
                  ></Img>
                </Link>
                {data}
              </Button>
            </Box>
          </Flex>
        </Box>
      </Show>
    </>
  );
}
