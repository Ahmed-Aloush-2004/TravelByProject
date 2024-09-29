import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Stack,
  Spinner,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  useToast,
  Flex,
  Button,
  AlertDescription,
} from "@chakra-ui/react";
import {
  getBlogPostByCategory,
  resetLoaderAndFlags,
  previousPageClick,
  nextPageClick,
} from "../redux/actions/blogPostActions";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import PostEdit from "./PostEdit";
function EditBlogPost() {
  const blogPostInfo = useSelector((state) => state.blogPosts);
  const {
    blogPosts,
    loading,
    error,
    blogPostUpdated,
    blogPostRemoved,
    pageItems,
    status,
  } = blogPostInfo;
  const toast = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetLoaderAndFlags());
    dispatch(getBlogPostByCategory("all", pageItems));
    if (blogPostUpdated) {
      window.scroll(0, 0);
      toast({
        title: "Blog post saved",
        description: "Blog post has been updated.",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    }
    if (blogPostRemoved) {
      window.scroll(0, 0);
      toast({
        title: "Blog post removed",
        description: "Blog post has been removed.",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    }
  }, [blogPostRemoved, blogPostUpdated, dispatch, pageItems, status]);

  return (
    <>
      <VStack spacing={"30px"} size="8xl">
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>We are sorry!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {loading ? (
          <Stack direction={"row"} spacing={"4"}>
            <Spinner
              mt={"20"}
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Stack>
        ) : (
          <>
            {blogPosts.map((post) => (
              <PostEdit
                key={post._id}
                contentOne={post.contentOne}
                contentTwo={post.contentTwo}
                category={post.category}
                title={post.title}
                image={post.image}
                _id={post._id}
                createdAt={post.createdAt}
                author={post.author}
              />
            ))}
          </>
        )}
      </VStack>
      <Flex justify={"center"} mt={"20"}>
        <Button
          m={"3"}
          isDisabled={pageItems === 0}
          onClick={() => dispatch(previousPageClick(pageItems))}
        >
          <ArrowLeftIcon />
        </Button>{" "}
        <Button
          m={"3"}
          isDisabled={status === 201 || blogPosts.length <= 3}
          onClick={() => dispatch(nextPageClick(pageItems))}
        >
          <ArrowRightIcon />
        </Button>
      </Flex>
    </>
  );
}

export default EditBlogPost;
