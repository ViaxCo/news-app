import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, HStack, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CommentType } from "../mobx/NewsStore";

type Props = {
  comments: CommentType[] | undefined;
};

// Custom span component with chakra props
const Span = chakra("span");

// Use dayjs plugin
dayjs.extend(relativeTime);

const Comments = ({ comments }: Props) => {
  return (
    <Box>
      {comments?.map((comment, i) => (
        <Flex key={i} mb="8">
          <Avatar mr="2" />
          <Box>
            <HStack spacing="1" fontSize="small" pb="1">
              <Span fontWeight="semibold">Anonymous</Span>
              <Span>•</Span>
              <Span color="#666" fontSize="xs">
                {dayjs(comment.createdAt).fromNow()}
              </Span>
            </HStack>
            <Text>{comment.text}</Text>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default Comments;
