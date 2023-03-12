import { Text, Button, Img, SimpleGrid, Box, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useLocation } from "react-router-dom";

export function Mens() {
  const toast = useToast();
  let [data, setData] = React.useState([]);
  let [page, setPage] = useState(1);
  let [total, setTotal] = useState(12);
  const { toggleChange } = useContext(AuthContext);
  let state = useLocation().state;
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

  React.useEffect(() => {
    let url;
    if (state?.data && state?.data !== "" && state?.data !== null) {
      url = `https://mock-server-app-pzg9.onrender.com/clothing?category=Mens&_page=${page}&_limit=12&q=${state.data}`;
    } else {
      url = `https://mock-server-app-pzg9.onrender.com/clothing?category=Mens&_page=${page}&_limit=12`;
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

  return (
    <Box pt="80px">
      <SimpleGrid columns={[2, 3, 4]} spacing="40px">
        {data?.map((el, index) => {
          return (
            <Box
              display="grid"
              justifyContent="center"
              justifyItems="center"
              padding="20px"
              boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
              heigth="full"
              key={index}
            >
              <Img heigth="50%" src={el.images[1]}></Img>
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
// Passing `columns={[2, null, 3]}` and `columns={{sm: 2, md: 3}}`
// will have the same effect.
