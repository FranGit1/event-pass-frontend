import { FieldLabel } from '../components/FieldLabel';
import { IFieldComponentBaseProps } from '../../types';
import tw from 'twin.macro';

export type ICheckboxProps = Omit<IFieldComponentBaseProps<boolean>, 'placeholder'> & {
  value?: boolean | number;
};
export const Checkbox = (props: ICheckboxProps) => {
  return (
    <div css={[tw`flex items-center gap-x-4`, props.containerCss]}>
      <input
        checked={props.value as boolean}
        type="checkbox"
        onChange={({ target: { checked } }) => {
          props.onChange(checked);
        }}
        disabled={props.disabled ?? false}
        css={[
          // STATEMENT: How can I understand styling in this component?
          // Ability to override every property when styling checkbox seems to be a very hard problem
          // Consensus given by HTML community is to remove default browser styling by giving "appearance-none"
          // and provide your own styling from scratch.
          // Unfortunately, "appearance-none" also removes the checkbox image.
          // To overcome this issue, custom checkbox is provided via url from public directory.
          // Of course, additional benefit of this solution is that it's very easy to swap this image with your own.
          tw`appearance-none h-5 w-5 border-1 border-primary-100 rounded cursor-pointer`,
          tw`checked:(border-primary-100 bg-primary-100)`,
          tw`focus:(ring-2 ring-primary-400)`,
          tw`hover:(border-primary checked:bg-primary )`,
          tw`disabled:(border-gray-300 bg-gray-300 cursor-not-allowed)`,
          tw`disabled:checked:(bg-primary-100 opacity-50)`,
          props.error && tw`border-error`,
          tw`bg-no-repeat`
        ]}
        style={{
          backgroundSize: 15,
          backgroundPositionX: 1,
          backgroundPositionY: 1.5,
          backgroundImage: props.value ? `url(../svg/checkmark.svg)` : 'unset'
        }}
      />

      <FieldLabel isInErrorState={!!props.error} disabled={props.disabled} containerCss={[tw`text-gray-300`]}>
        {props.label}
      </FieldLabel>
    </div>
  );
};
