import {
  Text,
  Button,
  Img,
  SimpleGrid,
  Flex,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import React from "react";
// import { useContext } from "react";
// import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { useLocation } from "react-router-dom";

export function Womens() {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(12);
  let [data, setData] = React.useState([]);
  let state = useLocation().state;
  const { toggleChange } = useContext(AuthContext);
  React.useEffect(() => {
    let url;

    if (state?.data && state?.data !== "" && state?.data !== null) {
      url = `https://mock-server-app-pzg9.onrender.com/clothing?category=Womens&_page=${page}&_limit=12&q=${state.data}`;
    } else {
      url = `https://mock-server-app-pzg9.onrender.com/clothing?category=Womens&_page=${page}&_limit=12`;
    }

    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setTotal(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, state]);

  const createData = (el) => {
    fetch("https://mock-server-app-pzg9.onrender.com/singleProduct", {
      method: "POST",

      body: JSON.stringify(el),

      headers: {
        "Content-type": "application/json",
      },
    });
    toast({
      title: "Cart Added",
      description: "product added succesfully to bag",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    toggleChange();
  };

  return (
    <Box pt={"80px"}>
      <SimpleGrid columns={[2, 3, 4]} gap={30}>
        {data?.map((el, index) => {
          return (
            <Box
              display="grid"
              // flexDirection="columns"
              justifyContent="center"
              justifyItems="center"
              padding="20px"
              boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
              heigth="full"
              key={index}
            >
              <Img heigth="50%" src={el.images[0]}></Img>
              <Text>{el.title}</Text>
              <Text>{el.subtitle}</Text>
              <Text>Price : ${el.strike_price}</Text>
              <Text>Rating : {el.rating}</Text>
              <Button cursor="pointer" onClick={() => createData(el)}>
                ADD to CART
              </Button>
            </Box>
          );
        })}
      </SimpleGrid>
      <Box display={"flex"} gap={6} m="30px">
        <Button
          bg="#BA9AE1"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>
        <Button bg="#BA9AE1">{page}</Button>
        <Button
          bg="#BA9AE1"
          disabled={total < 12}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
