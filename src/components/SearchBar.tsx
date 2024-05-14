import "twin.macro";

import { useEffect, useState } from "react";

import { HiSearch } from "react-icons/hi";
import { IComponentBaseProps } from "../types";
import { TextInput } from "../fields/controlled/TextInput";
import { useDebounce } from "../hooks/use-debounce";

interface ISearchBarProps extends IComponentBaseProps {
  value: string;
  onChange: (term: string) => void;
  placeholder?: string;
}

export const SearchBar = (props: ISearchBarProps) => {
  const [term, setTerm] = useState(props.value ?? "");
  const onChange = useDebounce(props.onChange, [], 350);

  useEffect(() => {
    setTerm(props.value);
  }, [props.value]);

  return (
    <TextInput.Contained
      value={term}
      onChange={(value) => {
        setTerm(value ?? "");
        onChange(value);
      }}
      lead={HiSearch}
      placeholder={props.placeholder}
      containerCss={props.containerCss}
    />
  );
};
