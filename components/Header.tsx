import { Flex, Heading, Link } from "@chakra-ui/layout";
import NextLink from "next/link";

const Header = () => {
  return (
    <Flex
      as="header"
      p="4"
      align="center"
      justify="center"
      position="fixed"
      top="0"
      left="0"
      zIndex="docked"
      w="100%"
      bg="white"
      shadow="md"
    >
      <Heading as="h1" fontWeight="semibold" fontFamily="'Libre Baskerville', serif">
        <NextLink href="/" passHref>
          <Link _hover={{ textDecoration: "none" }}>News App</Link>
        </NextLink>
      </Heading>
    </Flex>
  );
};

export default Header;
