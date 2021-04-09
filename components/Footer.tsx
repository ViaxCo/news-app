import { Flex } from "@chakra-ui/layout";

const Footer = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="center"
      fontSize="sm"
      textAlign="center"
      color="#777"
      mt="6"
      p="4"
    >
      Copyright &copy; {new Date().getFullYear()} ViaxCo. All Rights Reserved
    </Flex>
  );
};

export default Footer;
