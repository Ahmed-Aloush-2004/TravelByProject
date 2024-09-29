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
  setUpdateButtonLoading,
} from "../slices/blogPost";

export const getBlogPostByCategory =
  (category, pageItems) => async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data, status } = await axios.get(
        `http://localhost:5000/api/blog-posts/${category}/${pageItems}`
      );
      dispatch(setBlogPostByCategory(data));
      dispatch(setStatus(status));
      console.log(data);
    } catch (error) {
      dispatch(
        setError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "An unexpected error occurred. Please try again later."
        )
      );
    }
  };

export const getBlogPost = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/blog-posts/post/${id}`
    );

    dispatch(setBlogPost(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error occurred. Please try again later."
      )
    );
  }
};

export const nextPageClick = (pageItems) => async (dispatch) => {
  dispatch(setNextPage(pageItems + 4));
};

export const previousPageClick = (pageItems) => async (dispatch) => {
  dispatch(setPreviousPage(pageItems - 4));
};

export const resetLoaderAndFlags = () => async (dispatch) => {
  dispatch(reset());
};

export const createNewBlogPost = (newPost) => async (dispatch, getState) => {
  dispatch(blogPostCreated(false));
  dispatch(setUpdateButtonLoading(true));
  const {
    user: { userInfo },
  } = getState();
  try {
    console.log(userInfo);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post("http://localhost:5000/api/blog-posts", newPost, config);
    dispatch(blogPostCreated(true));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error occurred. Please try again later."
      )
    );
  }
};

export const updatePost = (updatedPost) => async (dispatch, getState) => {
  dispatch(blogPostUpdated(false));
  dispatch(setUpdateButtonLoading(true));
  const {
    user: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.put(
      "http://localhost:5000/api/blog-posts",
      updatedPost,
      config
    );
    dispatch(blogPostUpdated(true));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error occurred. Please try again later."
      )
    );
  }
};

export const removePost = (_id) => async (dispatch, getState) => {
  dispatch(setRemoveButtonLoading(true));
  dispatch(blogPostRemoved(false));
  const {
    user: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `http://localhost:5000/api/blog-posts/${_id}`,
      config
    );
    dispatch(setBlogPostByCategory(data));
    dispatch(blogPostRemoved(true));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error occurred. Please try again later."
      )
    );
  }
};
