import axios from "axios";

import {
  setBlogPost,
  setBlogPostByCategory,
  setError,
  setLoading,
  blogPostCreated,
  blogPostRemoved,
  blogPostUpdated,
} from "../slices/blogPost";

export const getBlogPostByCategory =
  (category, pageItems) => async (dispath) => {
    dispath(setLoading(true));

    try {
      const { data } = await axios.get("http://localhost:5000/api/blog-posts");
      dispath(setBlogPostByCategory(data));
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
