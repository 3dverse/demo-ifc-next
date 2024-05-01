//------------------------------------------------------------------------------
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
export const SearchInput = ({ setSearch }: { setSearch: (searchString: string) => void }) => {
    //------------------------------------------------------------------------------
    return (
        <InputGroup w="full" flex="1" size="sm">
            <InputLeftElement pointerEvents="none" pl="1">
                <RiSearchLine />
            </InputLeftElement>
            <Input
                type="search"
                placeholder="Rechercher..."
                onChange={(e) => setSearch(e.target.value)}
                rounded="full"
                bgColor="transparent"
                borderColor="transparent!"
            />
        </InputGroup>
    );
};
