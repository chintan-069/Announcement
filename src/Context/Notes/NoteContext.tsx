// import * as React from "react";
// import { createContext, useState } from "react";

// // const defaultvalue = {}

// const formContext = createContext();

// interface FormProviderProps{
//     children:React.ReactNode
// }

// export const FormProvider:React.FC<FormProviderProps> = ({ children }) => {
//     const [formData, setFormData] = useState({
//       firstPage: { name: '', email: '', typeOfFunctions: '' },
//       secondPage: { numberOfPeople: '', guestBreakdown: '', nonDrinkers: '', averageAge: '', typeOfEvent: '' },
//       thirdPage: { timeOfDate: '', eventLength: '', calendar: '', expenditureRange: '' },
//     });

//     return (
//         <formContext.Provider value={{ formData, setFormData }}>
//           {children}
//         </formContext.Provider>
//       );
//     }




// // export default formContext

// export const useformContext = ()=>React.useContext(formContext)
import * as React from 'react'
import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from 'react';
// import { string } from 'yup';
// import Thankyou from '../../../lib/webparts/helloworld/child comeponent/Thankyou';

// Define types for the form data
export interface FirstPageData {
  name: string;
  email: string;
  // typeOfFunctions: string;
  calendar: string;
}

export interface registration2 {
  TypeOfRefund: string
  Amount: string
  Reason: string
  // SuppportDocument: string
  Acknowledgement1: string
  Acknowledgement2: string
  Acknowledgement3: string
  transfer:string
  // Signature: string 
  // Date: string

}


export interface Australian {

  AccountName: string
  BSB: string
  AccountNumberA: string

}
export interface Other {
  Currency: string
  Country: string

  BeneficiaryName: string
  BeneficiaryAddressNew: string
  BankName: string
  BankAddress: string
  AccountNumber: string
  IFSCCode: string
  SwiftCode: string
  IBANNumber: string

}
export interface registration {
  fullName: string,
  address: string,
  studentId: string;
  emailAddress: string,
  primaryPhone: string,
  dateOfBirth: string,
  course: string,
  courseStartDate: string,
  // Date: string,

}
export interface ThankyouPageData {
  total: number;
}

// Define FormData as a combination of FirstPageData, SecondPageData, and I_9
export interface FormData {
  registration2: registration2;
  Australian: Australian;
  Other: Other;
  registration: registration
}

// Define the context type
export default interface FormContextType {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

// Create the context with an initial value of undefined
const FormContext = createContext<FormContextType | undefined>(undefined);

// Define props for the FormProvider component
interface FormProviderProps {
  children: ReactNode;
}

// FormProvider component to provide FormContext to its children
export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  // State to manage form data
  const [formData, setFormData] = useState<FormData>({
    // firstPage: { name: '', email: '', calendar: ''}, // typeOfFunctions: '' },
    registration2: {
      TypeOfRefund: "",
      Amount: "",
      Reason: "",
      // SuppportDocument: "",
      Acknowledgement1: "",
      Acknowledgement2:"",
      Acknowledgement3:"",
      transfer:"",
      // Signature: "",
      // Date: "",
    },
    // secondPage: { numberOfPeople: '', guestBreakdown: '', nonDrinkers: '', averageAge: '', typeOfEvent: '', },
    Australian: {
      AccountName: "",
      BSB: "",
      AccountNumberA: "",
    },
    Other: {
      Currency: "",
      Country: "",
      BeneficiaryName: "",
      BeneficiaryAddressNew: "",
      BankName: "",
      BankAddress: "",
      AccountNumber: "",
      IFSCCode: "",
      SwiftCode: "",
      IBANNumber: "",
    },
    registration: {
      fullName: "",
      address: "",
      studentId: "",
      primaryPhone: "",
      emailAddress: "",
      dateOfBirth: "",
      courseStartDate: "",
      course: "",
      // Date: "",
    }
  });

  //  console.log(formData.firstPage.name,"name is");


  // Provide formData and setFormData through the FormContext.Provider
  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use FormContext
export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};


