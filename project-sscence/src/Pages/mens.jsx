import {
  Text,
  Button,
  InputGroup,
  InputRightElement,
  Input,
  Img,
  SimpleGrid,
  Flex,
  Box
} from "@chakra-ui/react";
import React from "react";
// import { useContext } from "react";
// import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

export function Mens() {
  let [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        "https://pacific-refuge-88537.herokuapp.com/api/clothing?category=Mens"
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(data);
  return (
    <Box>
      <SimpleGrid columns={[2, null, 3]} spacing="40px">
        {data?.map((el) => {
          return (
            <Box heigth="full" key={Date.now().toString()}>
              <Img heigth="50%" src={el.images[1]}></Img>
              <Text>{el.title}</Text>
              <Text>{el.subtitle}</Text>
              <Text>Price : ${el.discounted_price}</Text>
              <Text>Rating : {el.rating}</Text>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
// Passing `columns={[2, null, 3]}` and `columns={{sm: 2, md: 3}}`
// will have the same effect.
