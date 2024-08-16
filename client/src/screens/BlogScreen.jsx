import React, { useEffect } from "react";
import {
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  Spinner,
  Alert,
  Image,
  Heading,
  Divider,
  Link,
  Spacer,
  Text,
  Flex,
  Box,
  VStack,
  Button,
} from "@chakra-ui/react";
import { Link as ReactLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogPostByCategory } from "../redux/actions/blogPostActions";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

function BlogScreen() {
  const { category } = useParams();

  const blogPostInfo = useSelector((state) => state.blogPosts);
  const { blogPosts, loading, error, pageItems } = blogPostInfo;
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getBlogPostByCategory(category, pageItems));
    window.scroll(0, 0);
  }, [dispath, category, pageItems]);
  console.log(blogPosts);

  return (
    <VStack spacing={"30px"} minHeight={"100vh"}>
      <Heading fontSize={"5xl"} mb={"16"}></Heading>
      {loading ? (
        <Stack direction={"row"} spacing={"4"}>
          <Spinner
            mt={"20"}
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size={"xl"}
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <>
          <Heading>
            {category.charAt(0).toUpperCase() + category.slice(1)} Blogs
          </Heading>
          {blogPosts.map((post) => (
            <Box
              key={post._id}
              maxW={{ base: "3xl", lg: "7xl" }}
              px={{ base: "6", md: "8", lg: "20" }}
            >
              <Stack direction={{ base: "column", lg: "row" }} spacing={"7"}>
                <Image
                  src={post.image}
                  minW={{ lg: "400px" }}
                  maxH={"280px"}
                  // maxW={"300px"}
                  loading={<Spinner />}
                  fit={"cover"}
                />
                <Flex direction={"column"}>
                  <Text fontSize={"2xl"} fontWeight={"semibold"} mb={"3"}>
                    {post.title}
                  </Text>
                  <Text fontSize={"lg"} noOfLines={"5"}>
                    {post.contentOne}
                  </Text>
                  <Spacer />
                  <Divider />
                  <Flex width={"full"} py={"2"}>
                    <Box display={{ base: "none", md: "flex" }}>
                      <Text>by {post.author}</Text>
                      <Text mx={"2"}></Text>
                      <Text>{new Date(post.createdAt).toDateString()}</Text>
                      <Text mx={"2"}></Text>
                    </Box>
                    <Text>
                      Category:{" "}
                      <Link
                        pl={"1"}
                        as={ReactLink}
                        to={`/blog/${post.category}`}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Link>
                    </Text>
                    <Spacer />
                    <Link as={ReactLink} to={`/${post._id}`}>
                      Read more...
                    </Link>
                  </Flex>
                  <Divider />
                </Flex>
              </Stack>
            </Box>
          ))}
        </>
      )}
    </VStack>
  );
}

export default BlogScreen;