import { Progress } from "@chakra-ui/react";

const ProgressLine = () => {
  return (
    <Progress
      position="absolute"
      top={{ base: "72px", md: "75px" }}
      zIndex="banner"
      size="xs"
      w="full"
      isIndeterminate
    />
  );
};

export default ProgressLine;
