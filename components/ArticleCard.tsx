import { Image } from "@chakra-ui/image";
import { Box, Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import { HTMLChakraProps } from "@chakra-ui/system";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { HTMLMotionProps, motion } from "framer-motion";
import NextLink from "next/link";
import { BsChat as ChatIcon } from "react-icons/bs";
import { IoMdTime as TimeIcon } from "react-icons/io";
import { ArticleType } from "../mobx/NewsStore";

type Props = {
  article: ArticleType;
};

// Custom Box component with motion props
type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;
export const MotionBox: React.FC<MotionBoxProps> = motion(Box);

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

const ArticleCard = ({ article }: Props) => {
  return (
    <LinkBox
      as="article"
      display="flex"
      flexDirection="column"
      h="350px"
      w="100%"
      maxW="340px"
      overflow="hidden"
      mb="8"
      rounded="md"
      shadow="md"
      _hover={{
        ".title": {
          color: "blue.600",
        },
      }}
    >
      {/* Image */}
      <MotionBox
        w="100%"
        h="200px"
        position="relative"
        // animation
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
      >
        <Image
          data-src={article.image}
          alt={article.image.split("/").pop()}
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center top"
          className="lazyload"
        />
        <Skeleton
          height="100%"
          width="100%"
          position="absolute"
          top="0"
          left="0"
          zIndex="docked"
        />
      </MotionBox>

      <Flex p="3" direction="column" flex="1" justify="space-between">
        {/* Title */}
        <Text fontWeight="semibold">
          <NextLink scroll={false} href={`/article/${article.id}`} passHref>
            <LinkOverlay className="title">{article.title}</LinkOverlay>
          </NextLink>
        </Text>

        <Flex align="center" justify="space-between" fontSize="sm" color="#666" mt="1">
          {/* Time */}
          <Flex align="center">
            <Box as={TimeIcon} mr="1" />
            <Text mt="0.5">
              {dayjs(article.published, "YYYY-MM-DD HH:mm:ss ZZ").fromNow()}
            </Text>
          </Flex>
          {/* Comment count */}
          <Flex align="center">
            <Box as={ChatIcon} mr="1" />
            <Text mt="0.5">{article.comments.length}</Text>
          </Flex>
        </Flex>
      </Flex>
    </LinkBox>
  );
};

export default ArticleCard;
