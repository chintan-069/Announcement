    /* eslint-disable @typescript-eslint/explicit-function-return-type */
    /* eslint-disable @typescript-eslint/no-explicit-any */


    import { object, string } from 'yup';
    import * as yup from 'yup';

    export const userSchema = object().shape({
        fullName:        string().required("Full Name is required").trim(),
        address:         string().required("Address is required").trim(),
        studentId:       string().required("Student id is required"),
        primaryPhone:    string().required("Contact is required").max(10),
        emailAddress:    string().email().required('Email is required').matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Entered email address is incorrect').trim(),
        dateOfBirth:     string().required('Date of birth is required'),
        courseStartDate:   string().required('Course start date is required'),
        course:           string().required('Course is required'),
        // Date:   string().required('Date is required'),
        // selectedAnimal: string().required(),
    });

    // const user = await userSchema.validate(data);
    export const validateData = async (data: any) => {
        try {
            await userSchema.validate(data, { abortEarly: false });
            // SubmitData(formData);
            console.log(true);

            return { data: data, success: true };

        } catch (error) {
            const errors: Record<string, string> = {};

            (error.inner as yup.ValidationError[]).forEach((error: yup.ValidationError) => {
                const fieldName = error.path as keyof Record<string, string>;
                const errorMessage = error.message;

                errors[fieldName] = errorMessage;
            });
            // setErrors(errors);
            return { data: errors, success: false };

        }
    }








    // import { object, string } from 'yup';
    // import * as yup from 'yup';

    // export const userSchema2 = object().shape({
    //     TypeOfRefund:      string().required("TypeOfRefund is required").trim(),
    //     Amount:            string().required("Amount is required").trim(),
    //     Reason:            string().required("Reason is required").trim(),
    //     SuppportDocument:  string().required("SuppportDocument is required").trim(),
    //     // Acknowledgement:   string().required("Acknowledgement is required"),
    //     Signature:               string().email().required('Signature is required').trim(),
    //     Date:               string().required(),
    // });

    // // const user = await userSchema.validate(data);
    // export const validateData2 = async (data: any) => {
    //     try {
    //         await userSchema2.validate(data, { abortEarly: false });
    //         // SubmitData(formData);
    //         console.log(true);

    //         return { data: data, success: true };

    //     } catch (error) {
    //         const errors: Record<string, string> = {};

    //         (error.inner as yup.ValidationError[]).forEach((error: yup.ValidationError) => {
    //             const fieldName = error.path as keyof Record<string, string>;
    //             const errorMessage = error.message;

    //             errors[fieldName] = errorMessage;
    //         });
    //         // setErrors(errors);
    //         return { data: errors, success: false };

    //     }}


    //     export const Australians = object().shape({
    //         AccountName:      string().required("AccountName is required").trim(),
    //         BSB:            string().required("BSB is required").trim(),
    //         AccountNumber:            string().required("AccoundNumber is required").trim(),
    //         // SuppportDocument:  string().required("SuppportDocument is required").trim(),
    //         // Acknowledgement:   string().required("Acknowledgement is required"),
    //         // Signature:               string().email().required('Signature is required').trim(),
    //         // Date:               string().required(),
    //     });
        
    //     // const user = await userSchema.validate(data);
    //     export const Australian = async (data: any) => {
    //         try {
    //             await Australians.validate(data, { abortEarly: false });
    //             // SubmitData(formData);
    //             console.log(true);
        
    //             return { data: data, success: true };
        
    //         } catch (error) {
    //             const errors: Record<string, string> = {};
        
    //             (error.inner as yup.ValidationError[]).forEach((error: yup.ValidationError) => {
    //                 const fieldName = error.path as keyof Record<string, string>;
    //                 const errorMessage = error.message;
        
    //                 errors[fieldName] = errorMessage;
    //             });
    //             // setErrors(errors);
    //             return { data: errors, success: false };
        
    //         }
    //     }

    //     export const otherBank = object().shape({
    //         Country:      string().required("Country is required").trim(),
    //         Currency:            string().required("Currency is required").trim(),
    //         BeneficiaryName:            string().required("BeneficiaryName is required").trim(),
    //         BeneficiaryAddress:  string().required("BeneficiaryAddress is required").trim(),
    //         BankName:   string().required("BankName is required"),
    //         BankAddress:               string().email().required('BankAddress is required').trim(),
    //         AccountNumber:               string().email().required('AccountNumber is required').trim(),
    //         IFSCCode:               string().email().required('IFSCCode is required').trim(),
    //         SwiftCode:               string().email().required('SwiftCode is required').trim(),
    //         IBANNumber:               string().email().required('IBANNumber is required').trim(),
       
           
    //     });
        
    //     // const user = await userSchema.validate(data);
    //     export const otherbank = async (data: any) => {
    //         try {
    //             await otherBank.validate(data, { abortEarly: false });
    //             // SubmitData(formData);
    //             console.log(true);
        
    //             return { data: data, success: true };
        
    //         } catch (error) {
    //             const errors: Record<string, string> = {};
        
    //             (error.inner as yup.ValidationError[]).forEach((error: yup.ValidationError) => {
    //                 const fieldName = error.path as keyof Record<string, string>;
    //                 const errorMessage = error.message;
        
    //                 errors[fieldName] = errorMessage;
    //             });
    //             // setErrors(errors);
    //             return { data: errors, success: false };
        
    //         }
    //     }



    

   export const formSchema = yup.object().shape({
        TypeOfRefund: yup.string().required("Type Of refund is required").trim(),
        Amount: yup.string().required("Amount is required").trim(),
        Reason: yup.string().required("Reason is required").trim(),
        // SuppportDocument: yup.string().required("SuppportDocument is required").trim(),
        // Acknowledgement: yup.array()
        // .min(1, "The mainimum required number of selection is 2").
        // max(2,"The maximum required number of selection is 2")
        // .required("Acknowledgement is required"),
        // Acknowledgement1 : yup.string().required(),
        // Acknowledgement2 : yup.string().required(),
        // Acknowledgement3 : yup.string().required(),
        // Signature: yup.string().required('Signature is required').trim(),
        transfer : yup.string().required("Bank transfer field is required"),
        // Date: yup.string().required('Date is required'),
        AccountName: yup.string().when('transfer', {
          is: 'Onshore transfer(australian)',
          then: schema => schema.required('Account Name is required').trim(),
          otherwise: schema => schema.notRequired()
        }),
        BSB: yup.string().when('transfer', {
          is: 'Onshore transfer(australian)',
          then: schema => schema.required('BSB is required').trim(),
          otherwise: schema => schema.notRequired()
        }),
        AccountNumberA: yup.string().when('transfer', {
          is: 'Onshore transfer(australian)',
          then: schema => schema.required('Account Number is required').trim(),
          otherwise: schema => schema.notRequired()
        }),
        Currency: yup.string().when('transfer', {
          is: 'AUD',
          then: schema => schema.required('Currency is required').trim(),
          otherwise: schema => schema.notRequired() 
        }),
        Country: yup.string().when('transfer', {
          is: 'AUD',
          then: schema => schema.required('Country is required').trim(),
          otherwise: schema => schema.notRequired()
        }),
        BeneficiaryName: yup.string().when('transfer', {
          is: 'AUD',
          then: schema => schema.required('Beneficiary Name is required').trim(),
          otherwise: schema => schema.notRequired()
        }),
        BeneficiaryAddressNew: yup.string().when('transfer', {
          is: 'AUD',
          then: schema => schema.required('Beneficiary address is required').trim(),
          otherwise: schema => schema.notRequired()
        }),
        BankName: yup.string().when('transfer', {
          is: 'AUD',
          then: schema => schema.required('Bank Name is required').trim(),
          otherwise: schema => schema.notRequired()
        }),
        BankAddress: yup.string().when('transfer', {
          is: 'AUD',
          then: schema => schema.required('Bank address is required').trim(),
          otherwise: schema => schema.notRequired()
        }),
        AccountNumber: yup.string().when('transfer', {
          is: 'AUD',
          then: schema => schema.required('Account Number is required').trim(),
          otherwise: schema => schema.notRequired()
        }),
        IFSCCode: yup.string().when('transfer', {
          is: 'AUD',
          then: schema => schema.required('IFSC code is required').trim(),
          otherwise: schema => schema.notRequired()
        }),
        SwiftCode: yup.string().when('transfer', {
          is: 'AUD',
          then: schema => schema.required('Swift code is required').trim(),
          otherwise: schema => schema.notRequired()
        }),
        IBANNumber: yup.string().when('transfer', {
          is: 'AUD',
          then: schema => schema.required('IBAN number is required').trim(),
          otherwise: schema => schema.notRequired()
        }),
     
      });
      
      // pass schema and data from from2.
  // export const validateData2 = async (data: any, currency: 'aus' | 'us') => {
  export const validateData2 = async (data: any) => {

    console.log(data);
    
    try {
        await formSchema.validate(data, { abortEarly: false });
        // SubmitData(formData);
        console.log(true);
      // if(currency === 'aus'){
      //   AutoScroll.validate()
      // }else{
      //   userSchema.validate()
      // }
        return { data: data, success: true };

    } catch (error) {
        const errors: Record<string, string> = {};

        (error.inner as yup.ValidationError[]).forEach((error: yup.ValidationError) => {
            const fieldName = error.path as keyof Record<string, string>;
            const errorMessage = error.message;

            errors[fieldName] = errorMessage;
        });
        // setErrors(errors);
        return { data: errors, success: false };

    }
}