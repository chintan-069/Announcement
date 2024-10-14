/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as  React from 'react'
import Refundform from './Componenets/Refundform'
import Refundform2 from './Componenets/Refundform2';
// import Example from './Componenets/Example';
// import Temporary from './Componenets/Temporary';

const RefundForm = (props:any) => {
  

  const [currentStep, setCurrentStep] = React.useState<number>(0);

  const handleNextClick = () => {
    setCurrentStep(currentStep + 1);

  };
  const handlePreviousClick = () => {
    setCurrentStep(currentStep - 1);
  }
  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return <><Refundform onNext={handleNextClick} _sp={props._sp}/> </>;
        case 1:
          return <Refundform2  onPrevious={handlePreviousClick} context={props.context} _sp={props._sp}/>;
          // case 2:
          //   return <Example/>;
       default:
        return null;
    }
  };

  return (
    <div>RefundForm
      
         {renderContent()}
          
    </div>
  )
}

export default RefundForm