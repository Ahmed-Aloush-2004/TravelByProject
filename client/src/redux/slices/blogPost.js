import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  blogPosts: [],
  blogPost: null,
  loading: false,
  error: null,
  pageItems: 0,
  status: 200,
  updateButtonLoading: false,
  blogPostCreated: false,
  blogPostUpdated: false,
  blogPsotRemoved: false,
  removeButtonLoading: false,
};

export const blogPostSlice = createSlice({
  name: "blogPosts",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setBlogPostByCategory: (state, action) => {
      state.blogPosts = action.payload;
      state.loading = false;
      state.error = null;
    },
    setBlogPost: (state, action) => {
      state.blogPost = action.payload;
      state.loading = false;
      state.error = null;
    },
    blogPostUpdated: (state, action) => {
      state.blogPostUpdated = action.payload;
      state.loading = false;
      state.error = null;
    },
    blogPostCreated: (state, action) => {
      state.blogPostCreated = action.payload;
      state.loading = false;
      state.error = null;
    },
    blogPostRemoved: (state, action) => {
      state.blogPsotRemoved = action.payload;
      state.loading = false;
      state.error = null;
    },

    setUpdateButtonLoading: (state, action) => {
      state.updateButtonLoading = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.updateButtonLoading = false;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setNextPage: (state, action) => {
      state.pageItems = action.payload;
    },
    setPreviousPage: (state, action) => {
      state.pageItems = action.payload;
    },
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.blogPsotRemoved = false;
      state.blogPostCreated = false;
      state.blogPostUpdated = false;
      state.updateButtonLoading = false;
      state.removeButtonLoading = false;
    },
    setRemoveButtonLoading: (state, action) => {
      state.removeButtonLoading = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
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
} = blogPostSlice.actions;
export default blogPostSlice.reducer;

export const blogPostSelector = (state) => state.blogPost;
