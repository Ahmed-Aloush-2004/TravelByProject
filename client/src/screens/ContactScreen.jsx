import React, { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import {
  Input,
  Textarea,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Container,
  FormErrorMessage,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import emailjs from "emailjs-com"
function ContactScreen() {
  const [emailjsInfo, setEmailjsInfo] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const sendEmail = (values, reset) => {
    // console.log(values);
    emailjs.send(emailjsInfo.service_id,emailjsInfo.template_id, values,{
      user_id:"IHgRieVIpzTTXJYeQ",
    })
      .then((response) => {
        toast({
          title: "Email send.",
          description: "Thanks! I will come back to you soom.",
          status: "success",
          duration: 7000,
          isClosable: true,
        });
       console.log(response);
       
        reset();
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        
        toast({
          title: "Whoops!",
          description: "Something went wrong. Please try again later.",
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      });
  };
  useEffect(() => {
    const creadentials = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/config/emailjs"
      );
      setEmailjsInfo(data);
    };
    creadentials();
  }, []);
  // console.log(emailjsInfo);

  const isValidEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };
  return (
    <Container maxW={"5xl"} minH={"100vh"} mt={"20"}>
      <Heading textAlign={"center"}>Get in touch</Heading>

      <Formik
        initialValues={{
          email: "",
          name: "",
          text: "",
        }}
        onSubmit={(values, actions) => {
          sendEmail(values, actions.resetForm);
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={"5"}>
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>

                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  variant="filled"
                  validate={(value) => {
                    let error;
                    if (!isValidEmail(value)) {
                      error = "The email address must be valid.";
                    }
                    return error;
                  }}
                />

                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>{" "}
              <FormControl isInvalid={!!errors.name && touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>

                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  variant="filled"
                  validate={(value) => {
                    let error;
                    if (value.length < 1) {
                      error = "Name nust contain at least 1 character!";
                    }
                    return error;
                  }}
                />

                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>{" "}
              <FormControl isInvalid={!!errors.text && touched.text}>
                <FormLabel htmlFor="text">Message</FormLabel>

                <Field
                  as={Input}
                  id="text"
                  name="text"
                  type="text"
                  variant="filled"
                  validate={(value) => {
                    let error;
                    if (value.length < 10) {
                      error = "Message must contain at least 10 character.";
                    }
                    return error;
                  }}
                />

                <FormErrorMessage>{errors.text}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="blue" width={"full"}>
                Submit
              </Button>
            </VStack>
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default ContactScreen;
