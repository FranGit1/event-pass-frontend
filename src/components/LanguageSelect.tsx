import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import i18n from 'i18next';
import { IComponentBaseProps } from '../types';

export interface ILanguageSelectProps extends IComponentBaseProps {}

const LanguageSelect = (props: ILanguageSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('ENG');
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option == 'HR') {
      i18n.changeLanguage('hr');
    } else if (option == 'ENG') {
      i18n.changeLanguage('en');
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block z-50 md:z-0" css={[props.containerCss]}>
      <button className="flex items-center py-2 px-4 cursor-pointer text-primary" onClick={toggleDropdown}>
        {selectedOption} <BsChevronDown className="w-4 h-4 ml-2" />
      </button>
      {isOpen && (
        <ul className="list-none mt-1 p-2 bg-white  absolute left-0">
          <li
            className={`py-2 px-4 cursor-pointer hover:(bg-primary) ${
              selectedOption === 'ENG' ? 'bg-primary-100 rounded-md' : ''
            }`}
            onClick={() => handleOptionClick('ENG')}
          >
            ENG
          </li>
          <li
            className={`py-2 px-4 cursor-pointer hover:(bg-primary) ${
              selectedOption === 'HR' ? 'bg-primary-100 rounded-md' : ''
            }`}
            onClick={() => handleOptionClick('HR')}
          >
            HR
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSelect;
