import { IFieldComponentBaseProps, Maybe } from "../../types";

import ReactQuill from "react-quill";
import { css } from "@emotion/react";
import tw from "twin.macro";
import { useState } from "react";

export type IRichTextEditorProps = Omit<
  IFieldComponentBaseProps<string>,
  "label" | "required" | "disabled"
> & {
  autofocus?: boolean;
};

const customQuillStyle = (o: {
  hasValue: boolean;
  hasError: boolean;
  isFocused: boolean;
}) => css`
  .quill {
    ${tw`bg-white rounded-2xl border-2 border-gray-light`}
    ${o.isFocused || o.hasError ? tw`border-primary` : tw``};
  }

  .ql-toolbar {
    ${tw`border-l-0 border-t-0 border-r-0 border-b-1 border-b-gray-300 text-black bg-transparent`}
    ${tw`hover:(border-b-primary-300)`}
  }
  .ql-container {
    ${tw`border-0 h-40 `}
    ${tw`hover:()`}
    
    
    ${o.isFocused && tw` hover:()`}
    ${o.hasError &&
    tw`border-b-error border-b-2 hover:(border-b-error border-b-2)`}
        ${!o.hasValue && tw`text-gray`}
        ${!o.hasValue && o.isFocused && tw`text-gray-light`}
  }
  .ql-clipboard {
    ${tw`bg-white`}
  }
  .ql-editor.ql-blank::before {
    ${tw`text-body font-400 -tracking-0.03 text-black not-italic`}
  }

  .ql-toolbar .ql-formats button {
    border: 1px solid #e5e5e5;
    z-index: 1;
    position: relative;
    padding: 4px 7px;
  }

  .ql-formats button:first-child {
    border-radius: 3px 0px 0px 3px;
  }

  .ql-formats button:last-child {
    border-radius: 0px 3px 3px 0px;
  }

  .ql-formats button:first-child:last-child {
    border-radius: 3px;
  }

  .ql-formats button:not(:first-child) {
    margin-left: -1px;
  }

  .ql-snow.ql-toolbar .ql-formats button:hover {
    border: 1px solid var(--primary100);
    fill: var(--primary100);
    stroke: var(--primary100);
    z-index: 10;
  }

  /* DROPDOWN STYLES */
  .ql-snow.ql-toolbar .ql-picker-label:hover,
  .ql-snow.ql-toolbar .ql-picker-label.ql-active,
  .ql-snow.ql-toolbar .ql-picker-item:hover,
  .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
    color: var(--primary100);
  }

  .ql-formats button.ql-active {
    border: 1px solid var(--primary100);
    z-index: 2;
  }
  .ql-snow.ql-toolbar button.ql-active .ql-fill,
  .ql-snow.ql-toolbar button:hover .ql-fill {
    fill: var(--primary100);
  }
  .ql-snow.ql-toolbar button.ql-active .ql-stroke,
  .ql-snow.ql-toolbar button:hover .ql-stroke {
    stroke: var(--primary100);
  }
`;

export const parseRTEValue = (val: Maybe<string>) => {
  const value = val ?? "";
  return value.replace(/<(.|\n)*?>/g, "").trim();
};
export const RichTextEditor = (props: IRichTextEditorProps) => {
  const [isFocused, setIsFocused] = useState(props.autofocus ?? false);

  // https://stackoverflow.com/questions/52866287/reactquill-validating-empty-input-value-showing-html-tags
  const hasValue = parseRTEValue(props.value).length !== 0;

  return (
    <div
      css={customQuillStyle({
        hasError: props.error != null,
        hasValue,
        isFocused,
      })}
    >
      <ReactQuill
        value={props.value}
        onFocus={(e) => {
          setIsFocused(true);
        }}
        onBlur={(e) => {
          setIsFocused(false);
        }}
        onChange={props.onChange}
        placeholder={props.placeholder}
        preserveWhitespace={true}
      />
    </div>
  );
};
