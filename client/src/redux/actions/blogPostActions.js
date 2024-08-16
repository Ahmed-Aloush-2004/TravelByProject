import axios from "axios";

import {
  setLoading,
  setError,
  setBlogPost,
  setBlogPostByCategory,
  blogPostCreated,
  blogPostRemoved,
  blogPostUpdated,
  setRemoveButtonLoading,
  reset,
  setNextPage,
  setPreviousPage,
  setStatus,
  setUpdateButtonLoading
} from "../slices/blogPost";

export const getBlogPostByCategory =
  (category, pageItems) => async (dispath) => {
    dispath(setLoading(true));

    try {
      const { data,status } = await axios.get(`http://localhost:5000/api/blog-posts/${category}/${pageItems}`);
      dispath(setBlogPostByCategory(data));
      dispath(setStatus(status))
      console.log(data);
      
    } catch (error) {
      dispath(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "An  unexpected error occurred.please try again later."
        )
      );
    }
  };






  export const nextPageClick=(pageItems) =>  async (dispath) => {
    dispath(setNextPage(pageItems + 4));
  }
  export const previousPageClick=(pageItems) =>  async (dispath) => {
    dispath(setPreviousPage(pageItems - 4));
  }
  export const resetLoaderAndFlags=() =>  async (dispath) => {
    dispath(reset());
  }
