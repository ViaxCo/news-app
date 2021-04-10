import { Image } from "@chakra-ui/image";
import { Box, Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { BsChat as ChatIcon } from "react-icons/bs";
import { IoMdTime as TimeIcon } from "react-icons/io";
import { ArticleType } from "../mobx/NewsStore";

type Props = {
  article: ArticleType;
};

dayjs.extend(relativeTime);

const ArticleCard = ({ article }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
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
        <Box w="100%" h="200px">
          <Image
            data-src={article.image}
            w="100%"
            h="100%"
            objectFit="cover"
            className="lazyload"
          />
          <Skeleton height="100%" />
        </Box>

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
    </motion.div>
  );
};

export default ArticleCard;
