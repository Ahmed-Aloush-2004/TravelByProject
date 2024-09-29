import user, {
  setError,
  setLoading,
  userLogin,
  userLogout,
} from "../slices/user.js";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    const { data } = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });
    dispatch(userLogin(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
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
export const logout = () => (dispatch) => {
  dispatch(userLogout());
  // localStorage.removeItem("userInfo");
};
