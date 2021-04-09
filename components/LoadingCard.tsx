import { Flex } from "@chakra-ui/layout";
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";

const LoadingCard = () => {
  return (
    <Flex
      as="article"
      flexDirection="column"
      h="350px"
      w="100%"
      maxW="340px"
      overflow="hidden"
      mb="8"
      rounded="md"
      shadow="md"
    >
      <Skeleton height="200px" />
      <SkeletonText p="3" noOfLines={5} />
    </Flex>
  );
};

export default LoadingCard;
