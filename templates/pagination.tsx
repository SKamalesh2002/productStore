import { FC } from "react";
import _ from "lodash";
import { background, Box, Flex } from "@chakra-ui/react";

interface Props {
  itemCount: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: FC<Props> = ({
  itemCount,
  pageSize,
  onPageChange,
  currentPage,
}) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;

  const pages: number[] = _.range(1, pageCount + 1);
  return (
    <Flex
      w="max-content"
      background="white"
      m="1rem"
      borderColor="gray.100"
      borderRadius="sm"
    >
      {pages.map((pageNumber) => (
        <Box
          key={pageNumber}
          borderRight="1px"
          borderColor="gray.100"
          cursor="pointer"
          pl="2"
          pr="2"
          pt="1"
          pb="1"
          onClick={() => onPageChange(pageNumber)}
          transitionDelay="50ms"
          {...(currentPage === pageNumber
            ? {
                background: "black",
                textColor: "white",
                _hover: { bg: "" },
              }
            : {
                background: "inherit",
                textColor: "inherit",
                _hover: { bg: "gray.200" },
              })}
        >
          {pageNumber}
        </Box>
      ))}
    </Flex>
  );
};

export default Pagination;
