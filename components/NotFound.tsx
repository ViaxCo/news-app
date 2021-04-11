import { Flex, Heading, HStack } from "@chakra-ui/layout";

type Props = {
  param: string;
};

const NotFound = ({ param }: Props) => {
  return (
    <Flex my="auto" align="center" justify="center">
      <HStack spacing="4">
        <Heading
          as="h2"
          fontWeight="semibold"
          fontSize="2xl"
          borderRight="2px solid black"
          p="4"
          py="2"
        >
          404
        </Heading>
        <Heading as="h3" fontSize="md" fontWeight="normal">
          This {param} could not be found
        </Heading>
      </HStack>
    </Flex>
  );
};

export default NotFound;
