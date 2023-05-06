import { Button, ButtonProps } from "@chakra-ui/button";
import { HStack, Text } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
};

// Custom span component with chakra props
const Span = chakra("span");

type PaginationButtonProps = { children: ReactNode } & ButtonProps;

const PaginationButton = ({ children, ...props }: PaginationButtonProps) => (
  <Button size="sm" fontWeight="bold" fontSize="lg" colorScheme="blue" {...props}>
    {children}
  </Button>
);

const Pagination = ({ currentPage, totalPages }: Props) => {
  const router = useRouter();
  const { query } = router;
  const handleBeginningClick = () => {
    router.push("/");
  };
  const handleEndClick = () => {
    router.push(`/page/${totalPages}`);
  };
  const handlePrevClick = () => {
    if (query.page === "2") return router.push("/");
    const page = +query.page! - 1;
    router.push(`/page/${page}`);
  };
  const handleNextClick = () => {
    // If on homepage
    if (!query.page) return router.push(`/page/2`);
    const page = +query.page! + 1;
    router.push(`/page/${page}`);
  };
  return (
    <HStack alignSelf="center" mt="6" spacing="4">
      <PaginationButton
        onClick={handleBeginningClick}
        isDisabled={currentPage === 1}
        px="2"
      >
        &lt;&lt;
      </PaginationButton>
      <PaginationButton onClick={handlePrevClick} isDisabled={currentPage === 1}>
        &lt;
      </PaginationButton>
      <Text>
        Page <Span fontWeight="semibold">{currentPage}</Span> of{" "}
        <Span fontWeight="semibold">{totalPages ? totalPages : 1}</Span>
      </Text>
      <PaginationButton onClick={handleNextClick} isDisabled={currentPage === totalPages}>
        &gt;
      </PaginationButton>
      <PaginationButton
        onClick={handleEndClick}
        isDisabled={currentPage === totalPages}
        px="2"
      >
        &gt;&gt;
      </PaginationButton>
    </HStack>
  );
};

export default Pagination;
