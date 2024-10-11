// src/shared-resources/components/ContainerLayout/ContainerLayout.tsx
import React from 'react';
import Button from 'shared-resources/components/Button/Button';
import QuestionHeader from '../QuestionHeader/QuestionHeader';
import MultiDigitGrid from '../ProblemGrid/MultiDigitGrid';

interface ContainerLayoutProps {
  headerText: string;
  content: React.ReactNode; // This will allow passing either text or any component
  buttonText: string;
  onButtonClick: () => void; // Handler for button click
}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({
  headerText,
  content,
  buttonText,
  onButtonClick,
}) => (
  <div className='flex flex-col'>
    <QuestionHeader HeaderText={headerText} />
    <div className='flex md:gap-[85px] items-end flex-col md:flex-row'>
      <div className='md:w-[962px] h-[250px] sm:h-[350px] md:h-[450px] max-h-[480px] p-20 border-[1px] md:ml-[60px] border-black mt-[61px] flex items-center justify-center'>
        {/* {content} */}
        <MultiDigitGrid />
      </div>

      <div className='md:pb-16'>
        <Button type='button' onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  </div>
);

export default ContainerLayout;
