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
    PopoverHeader,
    Button,
    Input,
    PopoverCloseButton,
    PopoverBody,
    PopoverContent,
    PopoverArrow,
    PopoverFooter,
    Spacer,
    Link,
    Img
  } from "@chakra-ui/react";
  import { SearchIcon, HamburgerIcon } from "@chakra-ui/icons";
  export function Navbar() {
    return (
      <>
        <Show above="md">
          <Box>
            <Flex bg=" black" color="#FFF" p="10px">
              <Box m="10px">
                <Link m="10px">MENSWEAR</Link>
                <Link m="10px">WOMENSWEAR</Link>
                <Link m="10px">EVERYTINKG-ELSE</Link>
                <Link m="10px">SEARCH</Link>
              </Box>
  
              <Spacer />
              <Link m="10px">SSENSE</Link>
              <Spacer />
              <Box m="10px">
                <Link m="10px">LOGIN</Link>
                <Link m="10px">SHOPING_BAG(0)</Link>
              </Box>
            </Flex>
          </Box>
        </Show>
        <Show below="md">
          <Box>
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
                      <Link m="10px">MENSWEAR</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link m="10px">WOMENSWEAR</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link m="10px">EVERYTINKG-ELSE</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link m="10px">SEARCH</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link m="10px">LOGIN</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link m="10px">SHOPING_BAG(0)</Link>
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
                      <Select width="80%" placeholder="Select option">
                        <option value="option1">MENSWEAR</option>
                        <option value="option2">WOMENSWEAR</option>
                        <option value="option3">EVERYTINKG-ELSE</option>
                      </Select>
                      <PopoverCloseButton
                        margin="5px"
                        // fontSize="18px"
                        variant="outline"
                      />
                      <PopoverBody>
                        <Flex>
                          <Input
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
                            icon={<SearchIcon />}
                          />
                        </Flex>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Box>
              <Spacer />
              <Link m="15px">SSENSE</Link>
              <Spacer />
              <Box>
                <Button margin="10px" padding="0px">
                  {" "}
                  <Img
                    fontSize="18px"
                    size="md"
                    width="25px"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8KGl_KSisz6hjoKP5iBpmUJmOVnqglWkCCCunX-b10HJ-HaLtnhZKukedAzDRvpNH4bc&usqp=CAU"
                  ></Img>
                </Button>
                <Button margin="10px" padding="0px">
                  {" "}
                  <Img
                    fontSize="18px"
                    size="md"
                    width="25px"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMsq2lipdJDei07_jKRH5v4WlTzgQ2YuSEQdoZj4BaWzf1NBmOkss3pbScJairRJuk8E0&usqp=CAU"
                  ></Img>
                </Button>
              </Box>
            </Flex>
          </Box>
        </Show>
      </>
    );
  }
  