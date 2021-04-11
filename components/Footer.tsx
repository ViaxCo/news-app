import { Flex, Link } from "@chakra-ui/layout";

const Footer = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="center"
      fontSize="sm"
      textAlign="center"
      color="#666"
      mt="6"
      p="4"
    >
      Copyright &copy; {new Date().getFullYear()}
      <Link
        href="https://www.viaxco.com"
        target="_blank"
        rel="noopener noreferrer"
        color="blue.600"
        mx="1.5"
      >
        ViaxCo.
      </Link>
      All Rights Reserved
    </Flex>
  );
};

export default Footer;
