import { Flex } from "@chakra-ui/react";
import { FC } from "react";

interface category {
  id: number | null;
  name: string;
}

interface Props {
  categories: category[];
  onItemSelect: (category: category) => void;
  selectedItem: category;
}

const ListGroup: FC<Props> = ({ categories, onItemSelect, selectedItem }) => {
  const handleClick = (category: category): void => {
    onItemSelect(category);
  };
  return (
    <Flex
      flexDirection="column"
      background="white"
      w="max-content"
      h="min-content"
      rounded="md"
      border="1px"
      borderColor="gray.100"
      borderRadius="10"
    >
      {categories.map((category) => (
        <Flex
          key={category.id}
          _first={{ borderTopRadius: "10" }}
          _last={{ borderBottomRadius: "10" }}
          p="2"
          borderBottom="1px"
          borderBottomColor="gray.100"
          cursor="pointer"
          role="group"
          className="list-group-item"
          onClick={() => handleClick(category)}
          {...(selectedItem.name === category.name
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
          {category.name}
        </Flex>
      ))}
    </Flex>
  );
};

export default ListGroup;
