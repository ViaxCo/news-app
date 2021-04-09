import { Box, VStack } from "@chakra-ui/layout";
import { Skeleton, SkeletonText } from "@chakra-ui/skeleton";

const LoadingArticle = () => {
  return (
    <>
      <VStack pb="2" mt="2" borderBottom="1px solid black">
        <Skeleton height="30px" w="100%" />
        <Skeleton alignSelf="flex-start" height="30px" w="60%" />
      </VStack>
      <Box pb="4" borderBottom="1px solid black">
        <Skeleton height="300px" mt="5" />
      </Box>
      <SkeletonText noOfLines={7} mt="4" />
    </>
  );
};

export default LoadingArticle;
