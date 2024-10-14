/* eslint-disable no-useless-concat */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Checkbox, IconButton, Label, PrimaryButton, Stack } from '@fluentui/react'
import { Field, RadioGroup, Radio, Input } from '@fluentui/react-components';
import * as  React from 'react'
import { errorprops } from './Refundform';
import { formSchema, validateData2 } from '../../../../Validation/ResgistrationSchema';
import { useFormContext } from '../../../../Context/Notes/NoteContext';
// import Signature from './Sinature';
// import { SPHttpClient } from '@microsoft/sp-http';
import styles from '../RefundForm.module.scss';
import Signature from './Sinature';
// import { uploadfile } from '../../../services/uploadfile';
// import * as yup from 'yup';
// import { Australian, Other } from '../../../../../lib/Context/Notes/NoteContext';
const Refundform2 = ({ onPrevious, context, _sp }: { onPrevious: () => void, context: any, _sp: any }) => {


  const [option1, setOption1] = React.useState(false);
  const [option2, setOption2] = React.useState(false);
  const [option3, setOption3] = React.useState(false);
  const [result, setResult] = React.useState(false);
  const [errors, setErrors] = React.useState<errorprops>({});
  const [selectedRefundType, setSelectedRefundType] = React.useState<string>('');

  //below teo states are coming from the signature control we use for signature control 
  const [signerrors, setsignerrors] = React.useState<string>("")
  const [signData, setsignData] = React.useState('')

  const { formData, setFormData } = useFormContext()
  const [UploadError, setUploadError] = React.useState("")

  //below we use for uploading image in sharepoint 
  const [file, setFile] = React.useState<string | null | ArrayBuffer | any>(null);

  const dat = new Date();
  const TodayDate = dat.getDate() + "/" + `${dat.getMonth() + 1}` + "/" + dat.getFullYear() ;
  console.log(TodayDate);


  const postData = async () => {
    // setIsPopupVisible(true);
    console.log("post");
    // setTimeout(async () => {
    // const checkin = (data.checkIn).toString();
    const iar = await _sp.web.lists.getByTitle(`RefundForm`).items.add({
      Title: "data",
      // firstPage: { name: '', email: '', calendar: ''}, // typeOfFunctions: '' },
      TypeOfRefund: formData.registration2.TypeOfRefund,
      Amount: formData.registration2.Amount,
      Reason: formData.registration2.Reason,
      SuppportDocument: "support",
      Acknowledgement1: option1 ? "true" : "false",
      Acknowledgement2: option2 ? "true" : "false",
      Acknowledgement3: option3 ? "true" : "false",
      Signature: "signature",
      Date: TodayDate,
      // secondPage: { numberOfPeople: '', guestBreakdown: '', nonDrinkers: '', averageAge: '', typeOfEvent: '', },
      AccountName: formData.Australian.AccountName,
      BSB: formData.Australian.BSB,
      AccoundNumber: formData.Australian.AccountNumberA,
      Currency: formData.Other.Currency,
      Country: formData.Other.Country,
      BeneficiaryName: formData.Other.BeneficiaryName,
      BeneficiaryAddressNew: formData.Other.BeneficiaryAddressNew,
      BankName: formData.Other.BankName,
      BankAddresAUD: formData.Other.BankAddress,
      AccountNumber: formData.Other.AccountNumber,
      IFSCCode: formData.Other.IFSCCode,
      SwiftCode: formData.Other.SwiftCode,
      IBANNumber: formData.Other.IBANNumber,
      fullName: formData.registration.fullName,
      address: formData.registration.address,
      studentId: formData.registration.studentId,
      primaryPhone: formData.registration.primaryPhone,
      emailAddress: formData.registration.emailAddress,
      dateOfBirth: formData.registration.dateOfBirth,
      courseStartDate: formData.registration.courseStartDate,
      course: formData.registration.course,
      Status: "Pending",
      Staff: "T.L"
    });

    // });
    console.log(iar);

    // setTimeout(() => {
    //   <PopupBasicExample toggleIsPopupVisible={toggleIsPopupVisible}/>
    // }, 2000);
    // }, 5000);

  }
  const setSignData = (data: any) => {
    // set state.
    setsignData(data);
  }

  // const get = async () => {
  //   // const items: any[] = await props._sp.web.lists.getByTitle("Student").items();
  //   const items: any[] = await _sp.web.lists.getByTitle("RefundForm").items();

  //   // console.log(items);
  //   // setInitialItems(items);
  // }
  // React.useEffect(() => {
  //   get().catch(err => console.log(err)
  //   )
  // })
  //
  const [checkBoxError, setCheckBoxError] = React.useState("");
  const createLibrary = async () => {

    // eslint-disable-next-line no-void
    await _sp.web.lists.add(`${formData.registration.fullName}`, '', 101)
      .then((_result: any) => {
        console.log(`Library created with name: ${formData.registration.fullName}`);
      });

  }
  // const uploadFile = async (e: React.FormEvent) => {
  //   const handlesubmit = async (e: React.FormEvent) => {
  //     // eslint-disable-next-line prefer-const
  //     e.preventDefault();


  //     const sample: any[] = [];
  //     setsignerrors('Image is required')
  // try{
  //     if (option1) {
  //       sample.push(option1.toString());
  //     } if (option2) {
  //       sample.push(option2.toString() );
  //     } if (option3) {
  //       sample.push(option3.toString());
  //     }
  //     console.log(sample.length);

  //     if (sample.length > 2 || sample.length < 1 || sample.length === 1) {
  //       setCheckBoxError("acknowledgement is required.");
  //       await formSchema.validate(formData.registration2, { abortEarly: false });
  //       // return;
  //       const files = (document.getElementById('Uploadfile') as HTMLInputElement).files;

  //       if (!files || files.length === 0) {
  //         setUploadError('No file selected for upload.');
  //         return;
  //       }
  //     } else {
  //       setCheckBoxError("");

  //       // if (option1.value) {
  //         setFormData((prefrences) => ({
  //           ...prefrences,
  //           registration2:{
  //             ...prefrences.registration2,
  //             Acknowledgement1: option1.toString() 
  //           }
  //         }));
  //       // } if (option2.value) {
  //         setFormData((prefrences) => ({
  //           ...prefrences,
  //           registration2: {
  //             ...prefrences.registration2,
  //             Acknowledgement2: option2.toString()  
  //           }
  //         }));
  //       // } if (option3.value) {
  //         setFormData((prefrences) => ({
  //           ...prefrences,
  //           registration2: {
  //             ...prefrences.registration2,
  //             Acknowledgement3: option3.toString() 
  //           }
  //         }));
  //       // }
  //       await postData().then(res => console.log(res)
  //     ).catch(err => console.log(err)
  //     )

  //     try {
  //       console.log('Validation successful');
  //       // Proceed with form submission logic here
  //       const files = (document.getElementById('Uploadfile') as HTMLInputElement).files;

  //     if (!files || files.length === 0) {
  //       setUploadError('No file selected for upload.');
  //       return;
  //     }
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
  //       const spopts = {
  //         headers: {
  //           "Accept": "application/json",
  //           "Content-Type": "application/json"
  //         },
  //         body: file
  //       };

  //       const url = `${context.pageContext.web.absoluteUrl}/_api/W/Lists/getByTitle('${formData.registration.fullName}')/RootFolder/Files/Add(url='WI4.pdf',overwrite=true)`;

  //       try {
  //         const response = await context.spHttpClient.post(url, SPHttpClient.configurations.v1, spopts);

  //         const responseJSON = await response.json();
  //         console.log(responseJSON.Name);
  //         // onNext();
  //         // validateForm().catch((err:any) => console.log(err))



  //       } catch (err) {
  //         console.error("Error uploading file: ", err);
  //         setUploadError('Error uploading file. Check console for details.');
  //       }
  //     }
  //     } catch (error) {
  //       const validationErrors: any = {};
  //       (error as any).inner.forEach((err: { path: string | number; message: any; }) => {
  //         validationErrors[err.path] = err.message;
  //       });
  //       setErrors(validationErrors);
  //       console.log('Validation errors:', validationErrors);
  //     }
  //     }
  //   }catch(err){
  //     console.log(err);

  //   }
  //     // console.log(sample);
  //     // setFormData((prefrences) => ({
  //     //   ...prefrences,
  //     //   registration2: {
  //     //     ...prefrences.registration2,
  //     //     Acknowledgement: [...sample]
  //     //   }
  //     // })

  //     // );

  //     // try {
  //     //   await formSchema.validate(formData.registration2, { abortEarly: false });
  //     //   console.log('Validation successful');
  //     //   // Proceed with form submission logic here
  //     // } catch (error) {
  //     //   const validationErrors: any = {};
  //     //   (error as any).inner.forEach((err: { path: string | number; message: any; }) => {
  //     //     validationErrors[err.path] = err.message;
  //     //   });
  //     //   setErrors(validationErrors);
  //     //   console.log('Validation errors:', validationErrors);
  //     // }


  //     console.log("submit");


  //     // await validateData2(formData.registration).then((res:any) =>
  //     //    (res.success ? (console.log("success"),onNext()) : setErrors(res.data)))
  //     //                     .catch((err: React.SetStateAction<errorprops>) => setErrors(err))


  //   }
  // const handlesubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const sample: any[] = [];
  //   setsignerrors('Image is required')
  //   // if(signData){
  //   //   setsignerrors("sign is require")
  //   // }else{
  //   //   setsignerrors("")
  //   // }
  //   if (option1) {
  //     sample.push(option1.toString());
  //   } if (option2) {
  //     sample.push(option2.toString());
  //   } if (option3) {
  //     sample.push(option3.toString());
  //   }
  //   console.log(sample.length);
  //   if (sample.length > 2 || sample.length < 1 || sample.length === 1) {
  //     setCheckBoxError("Please select two checkbox.");
  //   }else{
  //     setCheckBoxError("")
  //   }
  //   const files = (document.getElementById('Uploadfile') as HTMLInputElement).files;

  //   if (!files || files.length === 0) {
  //     setUploadError('No file selected for upload.');
  //     // return;
  //   }else{
  //     setUploadError("")
  //   }
  //   try {

  //     // setCheckBoxError("");
  //     await validateData2(formData.registration2).then((res: any) =>
  //       (res.success ? (

  //         console.log("success"),setCheckBoxError(""),setUploadError(""),setsignerrors(""),postData(),createLibrary()) : setErrors(res.data)))
  //       .catch((err: React.SetStateAction<errorprops>) => setErrors(err))
  //     // console.log(result);

  //     // file upload
  //     const files = (document.getElementById('Uploadfile') as HTMLInputElement).files;

  //       if (!files || files.length === 0) {
  //           setUploadError('No file selected for upload.');
  //           return;
  //       }

  //       for (let i = 0; i < files.length; i++) {
  //           const file = files[i];
  //           const spopts = {
  //               headers: {
  //                   "Accept": "application/json",
  //                   "Content-Type": "application/json"
  //               },
  //               body: file
  //           };

  //           const url = `${context.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('${formData.registration.fullName}')/RootFolder/Files/Add(url='Signature.pdf',overwrite=true)`;



  //           try {
  //               const response = await context.spHttpClient.post(url, SPHttpClient.configurations.v1, spopts);
  //               const responseJSON = await response.json();
  //               console.log(responseJSON.Name);
  //               // onNext();
  //           } catch (err) {
  //               console.error("Error uploading file: ", err);
  //               setUploadError('Error uploading file. Check console for details.');
  //           }
  //       }
  //       // sign data.
  //       const image = {
  //         headers: {
  //             "Accept": "application/json",
  //             "Content-Type": "application/json"
  //         },
  //         body: signData
  //     };
  //     const imagefile = `${context.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('${formData.registration.fullName}')/RootFolder/Files/Add(url='image.pdf',overwrite=true)`;
  //     try {
  //       const response = await context.spHttpClient.post(imagefile, SPHttpClient.configurations.v1, image);
  //       const responseJSON = await response.json();
  //       console.log(responseJSON.Name);
  //       // onNext();
  //       alert("Thanks for submmtting ")
  //   } catch (err) {
  //       console.error("Error uploading file: ", err);
  //       setUploadError('Error uploading file. Check console for details.');
  //   }
  //   }
  //   catch (err) {
  //     setErrors(err);
  //   }
  // }

  // console.log(formData.registration2);



  // const _onCheck = (item: any) => {
  //   setFormData((preferences: any) => ({

  //     ...preferences,
  //     registration2 : {
  //       ...preferences.registration2,
  //       Acknowledgement : [...preferences.registration2.Acknowledgement, item.data]
  //     }
  //   }))
  // }
  // console.log(FormData);


  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const selectedOptions = [option1, option2, option3].filter(option => option);
    if (selectedOptions.length !== 2) {
      setCheckBoxError("Please select exactly two checkboxes.");
    } else {
      setCheckBoxError("");
    }

    if (!file || file.length === 0) {
      setUploadError('No file selected for upload.');
    } else {
      setUploadError("");
    }

    if (!signData) {
      setsignerrors("Please save your image");
    } else {
      setsignerrors("");
    }
    // ahi thi pan schema pass kari sakay..
    await validateData2(formData.registration2 && formData.Australian && formData.Other).then((res: any) =>
    (res.success ? (
      // setCheckBoxError(""),
      // setUploadError(""),
      // setsignerrors(""),
      setResult(true)
    ) : setErrors(res.data))
    ).catch((err: React.SetStateAction<errorprops>) => setErrors(err));
    console.log("post1");

    if (selectedOptions.length === 2 && file.length > 0 && signData && result) {
      console.log("post2");

      try {
        await validateData2(formData.registration2).then((res: any) =>
        (res.success ? (
          postData(),
          createLibrary()
        ) : setErrors(res.data))
        ).catch((err: React.SetStateAction<errorprops>) => setErrors(err));
        console.log("post3");



        const formDatasent = { "signature": signData.replace('data:image/png;base64,', ''), "file": file.replace('data:image/png;base64,', ''), "fullname": formData.registration.fullName };
        // console.log();

        console.log(formDatasent, "first");

        try {
          console.log("second");
          // Make a request to Power Automate Flow
          const response = await fetch("https://prod-21.westus.logic.azure.com:443/workflows/0df4a41d4589428383bee2aa9f13ed52/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YChepFStJeQqq5kNigT6QbI7Su1YCBxbJBusr1v6fZg",

            
            {
              method: "POST",
              headers: {
                // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                // You don't need to set Content-Type for FormData; the browser will do that automatically.
                'Content-Type': 'application/json'
              },
              // contentType: 'application/json',
              body: JSON.stringify(formDatasent)
            });

          if (response.ok) {
            alert("successfully send your requesst wait for the approval we will send you an mail");
          } else {
            console.error("Error uploading files:", response.statusText);
            setUploadError("File upload failed.");
          }
        } catch (error) {
          console.error("Error:", error);
          setUploadError("File upload failed. Check console for details.");
        }

        //==========================================================================
        //we use below file upload code to upload the image and signature in sharepoint library but we can;t send it dirctly into it we use power automate flow to  convert this image form base 64 to binary and tehn it upload in the shaepoint libary
        // // File upload
        // for (let i = 0; i < files.length; i++) {
        //   const file = files[i];


        //   const spopts = {
        //     headers: {
        //       "Accept": "application/json",
        //       "Content-Type": "application/json"
        //     },
        //     body: file
        //   };

        //   const url = `${context.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('${formData.registration.fullName}')/RootFolder/Files/Add(url='Image.jpg',overwrite=true)`;
        //   try {
        //     const response = await context.spHttpClient.post(url, SPHttpClient.configurations.v1, spopts);
        //     const responseJSON = await response.json();
        //     console.log(responseJSON.Name);



        //   } catch (err) {
        //     console.error("Error uploading file: ", err);
        //     setUploadError('Error uploading file. Check console for details.');
        //   }
        // }
        // // Sign data upload
        // const image = {
        //   headers: {
        //     "Accept": "application/json",
        //     "Content-Type": "application/json"
        //   },
        //   body: signData
        // };
        // const imagefile = `${context.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('${formData.registration.fullName}')/RootFolder/Files/Add(url='Signature.jpg',overwrite=true)`;
        // try {
        //   const response = await context.spHttpClient.post(imagefile, SPHttpClient.configurations.v1, image);
        //   const responseJSON = await response.json();
        //   console.log(responseJSON.Name);
        //   alert("Your refundded request is submit to our organization we will send you an confirmation mail in your inbox after succefully aproving your request  ");
        // } catch (err) {
        //   console.error("Error uploading file: ", err);
        //   setUploadError('Error uploading file. Check console for details.');
        // }
        //==========================================================================
      } catch (err) {
        setErrors(err);
      }
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "transfer") {
      setSelectedRefundType(value);
    }
    const files = e.target.files ? e.target.files[0] : null;

    if (files) {
      const reader = new FileReader();

      // Read file as Data URL
      reader.onload = () => {
        setFile(reader.result); // Save image data (base64 URL)
        console.log(reader.result); // Log the base64 image data
      };

      reader.readAsDataURL(files); // Converts image to base64
    }




    setFormData((prevFormData) => ({
      ...prevFormData,
      registration2: {
        ...prevFormData.registration2,
        [name]: value,
      },
      Australian: {
        ...prevFormData.Australian,
        [name]: value,
      },
      Other: {
        ...prevFormData.Other,
        [name]: value,
      },
    }));
  };

  //for Date control which is at line no 1382
  // const _onDateChanged = (date: Date | null | undefined, text: string) => {
  //   if(date){
  //     setErrors({"Date" : ""});
  //   }
  //   setFormData((prevState: any) => ({
  //     ...prevState,
  //     // ...prevState.eventPlanning,  //cnotext state..
  //     registration2: {
  //       ...prevState.registration2,
  //       [text]: date
  //     }
  //   }));
  // }



  const handleBlur = async (e: any) => {
    const { name, value } = e.target;
    try {
      await formSchema.validateAt(name, { [name]: value });
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    } catch (error) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: (error as any).message }));
    }
  };



  // const handleError = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   console.log(name, value);


  //   try {

  //     await formSchema.validateAt(name, { [name]: value }, { strict: true })

  //     setErrors((previousError) => ({ ...previousError, [name]: undefined }))

  //   } catch (error) {
  //     // console.log(error);
  //     setErrors(previouError => ({ ...previouError, [name]: error.errors[0] }))

  //   }
  //   // setErrors({...errors, [name] : })
  // }

  // const austrelian = () => {
  //   return (<>
  //     <div>
  //       <Label>
  //         account name:*
  //       </Label>
  //       <Field validationMessage={errors && errors.AccountName}>
  //         <Input id={inputId} type='text' value={formData.Australian.AccountName} name='AccountName' onChange={handleChange} onBlur={handleError} />
  //       </Field>
  //     </div>
  //     <div>
  //       <Label>
  //         BSB:
  //       </Label>
  //       <Field validationMessage={errors && errors.BSB}>
  //         <Input id={inputId} type='text' onKeyDown={(e) => {
  //           const isbackspace = e.key === 'Backspace';
  //           const isNumber = /^[0-9]$/;
  //           if (!isNumber.test(e.key) && !isbackspace) {
  //             e.preventDefault();
  //           }
  //         }} value={formData.Australian.BSB.toString()} name='BSB' onChange={handleChange} onBlur={handleError} />
  //       </Field>
  //     </div>
  //     <div>

  //     <Stack horizontal className={styles.Right}>
  //       <Label  className={styles.lbl}>
  //         Account number:
  //       </Label>

  //      <Stack className={styles.txtfield}>
  //       <Field validationMessage={errors && errors.AccountNumber}>
  //         <Input id={inputId} type='text' onKeyDown={(e) => {
  //           const isbackspace = e.key === 'Backspace';
  //           const isNumber = /^[0-9]$/;
  //           if (!isNumber.test(e.key) && !isbackspace) {
  //             e.preventDefault();
  //           }
  //         }} value={formData.Australian.AccountNumber.toString()} name='AccountNumber' onChange={handleChange} onBlur={handleError} />
  //       </Field>
  //       </Stack></Stack>
  //     </div>
  //     {/* <div className={`${styles.margin20} ${styles.edate}`}>
  //       <Label>
  //         Acknowledgements*:
  //       </Label>
  //       <Field validationMessage={errors && errors.primaryPhone}>
  //         <Input id={inputId} type='text' onKeyDown={(e) => {
  //           const isbackspace = e.key === 'Backspace';
  //           const isNumber = /^[0-9]$/;
  //           if (!isNumber.test(e.key) && !isbackspace) {
  //             e.preventDefault();
  //           }
  //         }} value={formData.primaryPhone.toString()} name='primaryPhone' {...props} onChange={handleChange} onBlur={handleError} />
  //       </Field>
  //     </div> */}
  //   </>)
  // }
  // const otherbank = () => {
  //   return (<>
  //     <h3>Please double-check youve entered the correct information before you submit the form to avoid delays.</h3>
  //     <div style={{ backgroundColor: 'lightblue' }}>
  //       <h2 style={{ color: 'red' }}>Overseas Transfer</h2>
  //       <h1>Please be aware that this is an international transaction, where processing fees/bank charges of AU$30 apply, and the currency exchange rate may affect the amount you finally receive. </h1>
  //       <h3>Do you have the right details?</h3>
  //       <p>International fund transfers are processed as per the information/ details provided by you in this form; thus, please ensure all information is correct and updated. Winslow College accepts no liability for any delays, mistakes or omissions that may occur due to misinformation leading to the financial institutions failure to identify the payee.</p>
  //       <h3>To avoid delays, please ensure that:</h3>
  //       <ul>
  //         <li>You have the correct recipient details</li>
  //         <li>Your designated bank account can receive money from overseas</li>
  //         <li>Your bank accepts either USD or AUD. Any difference in exchange rates will be your responsibility.</li>
  //       </ul>
  //       <p>An international transfer can take 1-2 weeks, depending on the bank and country.</p>
  //       <h3>Please double-check you’ve entered the correct information before you submit the form to avoid any delays & extra administrative charges.</h3>
  //       <p><span style={{ fontSize: '10px', fontWeight: 'bold' }}>Note:</span> In the case, the international money transfer does not get processed due to incorrect bank details, you will be notified, and you will be required to submit a new refund form with the correct details. The transfer fee will be charged again for the 2nd attempt, and the same will be deducted from the total refundable amount.</p>
  //     </div>
  //     <div>
  //       {/* error baki */}
  //       <select
  //         name="course"
  //         style={{ width: '100%', height: '32px' }}
  //         value={formData.registration.course}
  //         onChange={handleChange}
  //       // onBlur={handleBlur}
  //       >
  //         <option value="">Select an option</option>
  //         <option value="10-20">india</option>
  //         <option value="20-30">USA</option>
  //         <option value="30-40">UK</option>

  //       </select>

  //     </div>
  //     <div>
  //       <Label>
  //         Please select the currency you want to receive your transfer*
  //       </Label>
  //       {/* <Input id={inputId} value={formData.organization} name='MorS' {...props} onChange={handleChange} onBlur={handleError} /> */}
  //       <Field validationMessage={errors && errors.Currency}>
  //         <RadioGroup layout="horizontal" >
  //           <Radio value="USD" name='Currency' label="USD" onChange={handleChange
  //           } />
  //           <Radio value="AUD" name='Currency' label="AUD" onChange={handleChange} />
  //         </RadioGroup>
  //       </Field>
  //     </div>
  //     <div>
  //       <h3>Please ensure your Bank accepts this currency.</h3>
  //       <div>
  //         <Label>
  //           benificiary name:
  //         </Label>
  //         <Field validationMessage={errors && errors.BeneficiaryName}>
  //           <Input id={inputId} type='text' value={formData.Other.BeneficiaryName} name='BeneficiaryName' onChange={handleChange} onBlur={handleError} />
  //         </Field>
  //       </div>
  //       <div>
  //         <Label>
  //           benificiary address:
  //         </Label>
  //         <Field validationMessage={errors && errors.BeneficiaryAddress}>
  //           <Input id={inputId} type='text' value={formData.Other.BeneficiaryAddress} name='BeneficiaryAddress' onChange={handleChange} onBlur={handleError} />
  //         </Field>
  //       </div>
  //       <div>
  //         <Label>
  //           Bank name:
  //         </Label>
  //         <Field validationMessage={errors && errors.BankName}>
  //           <Input id={inputId} type='text' value={formData.Other.BankName} name='BankName' onChange={handleChange} onBlur={handleError} />
  //         </Field>
  //       </div>
  //       <div>
  //         <Label>
  //           Bank Address:
  //         </Label>
  //         <Field validationMessage={errors && errors.BankAddress}>
  //           <Input id={inputId} type='text' value={formData.Other.BankAddress} name='BankAddress' onChange={handleChange} onBlur={handleError} />
  //         </Field>
  //       </div>
  //       <div >
  //         <Label>
  //           Account Number:
  //         </Label>
  //         <Field validationMessage={errors && errors.AccountNumber}>
  //           <Input id={inputId} type='text' onKeyDown={(e) => {
  //             const isbackspace = e.key === 'Backspace';
  //             const isNumber = /^[0-9]$/;
  //             if (!isNumber.test(e.key) && !isbackspace) {
  //               e.preventDefault();
  //             }
  //           }} value={formData.Other.AccountNumber.toString()} name='AccountNumber' onChange={handleChange} onBlur={handleError} />
  //         </Field>
  //       </div>
  //       <div >
  //         <Label>
  //           IFSC Code:
  //         </Label>
  //         <Field validationMessage={errors && errors.IFSCCode}>
  //           <Input id={inputId} type='text' onKeyDown={(e) => {
  //             const isbackspace = e.key === 'Backspace';
  //             const isNumber = /^[0-9]$/;
  //             if (!isNumber.test(e.key) && !isbackspace) {
  //               e.preventDefault();
  //             }
  //           }} value={formData.Other.IFSCCode.toString()} name='IFSCCode' onChange={handleChange} onBlur={handleError} />
  //         </Field>
  //       </div>
  //       <div>
  //         <Label>
  //           Shift Code:
  //         </Label>
  //         <Field validationMessage={errors && errors.SwiftCode}>
  //           <Input id={inputId} type='text' onKeyDown={(e) => {
  //             const isbackspace = e.key === 'Backspace';
  //             const isNumber = /^[0-9]$/;
  //             if (!isNumber.test(e.key) && !isbackspace) {
  //               e.preventDefault();
  //             }
  //           }} value={formData.Other.SwiftCode.toString()} name='SwiftCode' onChange={handleChange} onBlur={handleError} />
  //         </Field>
  //       </div>
  //       <div>
  //         <Label>
  //           IBAN Number(if applicable):
  //         </Label>
  //         <Field validationMessage={errors && errors.IBANNumber}>
  //           <Input id={inputId} type='text' onKeyDown={(e) => {
  //             const isbackspace = e.key === 'Backspace';
  //             const isNumber = /^[0-9]$/;
  //             if (!isNumber.test(e.key) && !isbackspace) {
  //               e.preventDefault();
  //             }
  //           }} value={formData.Other.IBANNumber.toString()} name='IBANNumber' onChange={handleChange} onBlur={handleError} />
  //         </Field>
  //       </div>
  //       <p>Countries that require IBAN number for fund transfers</p>
  //     </div>
  //   </>)
  // }


  return (
    <>

      <Stack className={styles.BodyStack}>
        <Stack className={styles.Form1}>
          <Stack className={styles.Fourty}>


            <div className={styles.images} />
            <h3>
              Online Refund Request Form
            </h3>


          </Stack>
          <Stack className={styles.Sixty}>

            <Stack className={styles.Demo}> <Label className={styles.head}><span style={{ fontSize: 24, color: 'white' }}>Student Detail</span></Label></Stack>

            <form onSubmit={handlesubmit}>


              <div>
                <Stack horizontal className={styles.Right} style={{ marginBottom: 10, }}><Label className={styles.lbl} required >Select Type Of Refund:</Label>       <Stack className={styles.txtfield} > <Field validationMessage={errors && errors.TypeOfRefund} >
                  <RadioGroup layout="horizontal" className={styles.RadioWrap}>

                    <Radio value="Withdrawal" name='TypeOfRefund' label="Withdrawal" onChange={handleChange} />

                    <Radio value="Transfer" name='TypeOfRefund' label="Transfer" onChange={handleChange} />

                    <Radio value="Cancellation" name='TypeOfRefund' label="Cancellation" onChange={handleChange} />

                    <Radio value="Visa Refusal" name='TypeOfRefund' label="Visa Refusal" onChange={handleChange} />

                    <Radio value="Other" name='TypeOfRefund' label="Other" onChange={handleChange} />

                    {/* <Radio value="pear" name='MorS' label="Pear" onChange={handleChange} /> */}

                  </RadioGroup>
                </Field>      </Stack> </Stack>

                {/* <Label>Select Type Of Refund:</Label>
                <Field validationMessage={errors && errors.TypeOfRefund}>

                  <RadioGroup layout="horizontal">

                    <Radio value="apple" name='MorS' label="Apple" onChange={handleChange} />

                    <Radio value="pear" name='MorS' label="Pear" onChange={handleChange} />

                    <Radio value="pear" name='MorS' label="Pear" onChange={handleChange} />

                    <Radio value="pear" name='MorS' label="Pear" onChange={handleChange} />

                    <Radio value="pear" name='MorS' label="Pear" onChange={handleChange} />

                    <Radio value="pear" name='MorS' label="Pear" onChange={handleChange} />

                  </RadioGroup>

                </Field> */}
              </div>
              <div>

                <Stack horizontal className={styles.Right} style={{ marginBottom: 10 }}><Label className={styles.lbl} required >Amount:</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.Amount}>
                  <Input
                    type="text"
                    value={formData.registration2.Amount}
                    name="Amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                      const isbackspace = e.key === 'Backspace';
                      const isSpace = e.key === ' ';
                      const isNumber = /^[0-9]$/;
                      if (!isNumber.test(e.key) && !isbackspace && !isSpace) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Field>      </Stack> </Stack>
                {/* <Label>
                  Amount:
                </Label>

                <Field validationMessage={errors && errors.Amount}>
                  <Input
                    type="text"
                    value={formData.registration2.Amount}
                    name="Amount"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={(e) => {
                      const isbackspace = e.key === 'Backspace';
                      const isNumber = /^[0-9]$/;
                      if (!isNumber.test(e.key) && !isbackspace) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Field> */}
              </div>

              <Stack horizontal className={styles.Right} style={{ marginBottom: 10, alignItems: "center" }}><Label className={styles.lbl} required >Reason <br /><span>
                (Please Attach any support Documentation):
              </span></Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.Reason}>
                <Input
                  type="text"
                  value={formData.registration2.Reason}
                  name="Reason"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                    const isbackspace = e.key === 'Backspace';
                    const isSpace = e.key === ' ';
                    const isNumber = /^[A-Za-z]$/;
                    if (!isNumber.test(e.key) && !isbackspace && !isSpace) {
                      e.preventDefault();
                    }
                  }}
                />
              </Field>      </Stack> </Stack>
              <div>
                <Stack horizontal className={styles.Right} style={{ marginBottom: 10 }}><Label className={styles.lbl} required >Upload image</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && UploadError}>
                  <IconButton iconProps={{ iconName: 'Upload' }} style={{ width: "auto", backgroundColor: 'white', marginTop: "10px", border: "0.5px solid black", height: 90 }} onClick={() => {
                    const res: any = document.querySelector('input[type="file"]')
                    if (res) {
                      res.click()
                    }
                  }} > <span>Upload Document</span></IconButton>

                  <input type="file" id='Uploadfile' accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
                </Field>      </Stack> </Stack>
                {/* {UploadError && <p style={{ color: 'red' }}>{UploadError}</p>}  */}

                {/* <IconButton iconProps={{ iconName: 'Upload' }} style={{ width: "auto", backgroundColor: 'white', marginTop: "10px", border: "1px solid black" }} onClick={() => {
                  const res: any = document.querySelector('input[type="file"]')
                  if (res) {
                    res.click()
                  }
                }} > <span>Upload Document</span></IconButton>

                <input type="file" id='Uploadfile' style={{ display: 'none' }} />
                {UploadError && <p style={{ color: 'red' }}>{UploadError}</p>} */}

              </div>
              {/* uploaad file control.. */}
              {/* <h3>Refund Method - Please provide your account details or the account details of the nominated third party where you wish the refund amount to be received.*</h3> */}
              <div >
                {/* <Input id={inputId} value={formData.organization} name='MorS' {...props} onChange={handleChange} onBlur={handleError} /> */}
                <Field validationMessage={errors && errors.transfer}>
                  <RadioGroup layout="horizontal">
                    <Radio
                      value="Onshore transfer(australian)"
                      name="transfer"
                      label="Onshore transfer(Australian bank)"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Radio
                      value="AUD"
                      name="transfer"
                      label="Overseas Transfer(Transfer fees applied)"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </RadioGroup>
                </Field>
              </div>

              {selectedRefundType === "Onshore transfer(australian)" && (
                <>   <Stack className={styles.Sixty}>
                  <div>


                    <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Account Name</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.AccountName}>
                      <Input
                        type="text"
                        value={formData.Australian.AccountName}
                        name="AccountName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={(e) => {
                          const isbackspace = e.key === 'Backspace';
                          const isSpace = e.key === ' ';
                          const isNumber = /^[A-Za-z]$/;
                          if (!isNumber.test(e.key) && !isbackspace && !isSpace) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Field>      </Stack> </Stack>
                    {/* <Label>Account Name:</Label>
                    <Field validationMessage={errors && errors.AccountName}>
                      <Input
                        type="text"
                        value={formData.Australian.AccountName}
                        name="AccountName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Field> */}
                  </div>

                  <div>

                    <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >BSB</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.BSB}>
                      <Input
                        type="text"
                        value={formData.Australian.BSB}
                        name="BSB"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={(e) => {
                          const isbackspace = e.key === 'Backspace';
                          const isSpace = e.key === ' ';
                          const isNumber = /^[0-9]$/;
                          if (!isNumber.test(e.key) && !isbackspace && !isSpace) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Field>      </Stack> </Stack>
                    {/* <Label>BSB:</Label>
                    <Field validationMessage={errors && errors.BSB}>
                      <Input
                        type="text"
                        value={formData.Australian.BSB}
                        name="BSB"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={(e) => {
                          const isbackspace = e.key === 'Backspace';
                          const isNumber = /^[0-9]$/;
                          if (!isNumber.test(e.key) && !isbackspace) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Field> */}
                  </div>

                  <div>

                    {/* <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Account number</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.AccountNumberA}>
                      <Input
                        type="text"
                        value={formData.Australian.AccountNumberA}
                        name="AccountNumberA"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={(e) => {
                          const isbackspace = e.key === 'Backspace';
                          const isNumber = /^[0-9]$/;
                          if (!isNumber.test(e.key) && !isbackspace) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Field>      </Stack> </Stack> */}

                    <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Account Number</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.AccountNumberA}>
                      <Input
                        type="text"
                        value={formData.Australian.AccountNumberA}
                        name="AccountNumberA"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={(e) => {
                          const isbackspace = e.key === 'Backspace';
                          const isSpace = e.key === ' ';
                          const isNumber = /^[0-9]$/;
                          if (!isNumber.test(e.key) && !isbackspace && ! isSpace) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Field>      </Stack> </Stack>


                    {/* <Label>Account Number:</Label>
                    <Field validationMessage={errors && errors.AccoundNumber}>
                      <Input
                        type="text"
                        value={formData.Australian.AccoundNumber}
                        name="AccoundNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={(e) => {
                          const isbackspace = e.key === 'Backspace';
                          const isNumber = /^[0-9]$/;
                          if (!isNumber.test(e.key) && !isbackspace) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </Field> */}
                  </div>



                </Stack> </>
              )}

              {selectedRefundType === "AUD" &&
                (
                  <>


                    <Stack className={styles.Sixty1}>
                      <h3 style={{ fontWeight: 500 }}>

                        Please double-check you’ve entered the correct information before you submit the form to avoid delays
                      </h3>
                      <div>

                        <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Currency</Label>       <Stack className={styles.txtfield}><Field validationMessage={errors && errors.Currency}>
                          <RadioGroup layout="horizontal" >
                            <Radio value="USD" name='Currency' label="USD" onChange={handleChange
                            } />
                            <Radio value="AUD" name='Currency' label="AUD" onChange={handleChange} />
                          </RadioGroup>
                        </Field>      </Stack> </Stack>
                        {/* <Label>Currency:</Label>
                      <Field validationMessage={errors && errors.Currency}>
                        <Input
                          type="text"
                          value={formData.Other.Currency}
                          name="Currency"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field> */}
                      </div>

                      <div>

                        <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Country</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.Country}>
                          {/* <RadioGroup layout="horizontal">
                    <Radio value="apple" name='course' label="Apple" onChange={handleChange
                                    } />
                    <Radio value="pear" name='course' label="Pear" onChange={handleChange} />
                    </RadioGroup> */}
                          <select
                            name="Country"
                            style={{ width: '100%', height: '32px' }}
                            value={formData.Other.Country}
                            onChange={handleChange}
                          // onBlur={handleBlur}
                          >
                            <option value="">Select an option</option>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>

                          </select>


                        </Field>  </Stack> </Stack>
                        {/* <Label>Country:</Label>
                      <Field validationMessage={errors && errors.Country}>
                        <Input
                          type="text"
                          value={formData.Other.Country}
                          name="Country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field> */}
                      </div>
                      <div>

                        <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Beneficiary Name:</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.BeneficiaryName}>
                          <Input
                            type="text"
                            value={formData.Other.BeneficiaryName}
                            name="BeneficiaryName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={(e) => {
                              const isbackspace = e.key === 'Backspace';
                              const isSpace = e.key === ' ';
                              const isNumber = /^[A-Za-z]$/;
                              if (!isNumber.test(e.key) && !isbackspace && !isSpace) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </Field>      </Stack> </Stack>
                        {/* <Label>Beneficiary Name:</Label>
                      <Field validationMessage={errors && errors.BeneficiaryName}>
                        <Input
                          type="text"
                          value={formData.Other.BeneficiaryName}
                          name="BeneficiaryName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field> */}
                      </div>

                      <div>

                        <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Beneficiary Address</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.BeneficiaryAddressNew}>
                          <Input
                            type="text"
                            value={formData.Other.BeneficiaryAddressNew}
                            name="BeneficiaryAddressNew"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Field>      </Stack> </Stack>
                        {/* <Label>Beneficiary Address:</Label>
                      <Field validationMessage={errors && errors.BeneficiaryAddress}>
                        <Input
                          type="text"
                          value={formData.Other.BeneficiaryAddress}
                          name="BeneficiaryAddress"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field> */}
                      </div>

                      <div>
                        <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Bank Name</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.BankName}>
                          <Input
                            type="text"
                            value={formData.Other.BankName}
                            name="BankName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={(e) => {
                              const isbackspace = e.key === 'Backspace';
                              const isSpace = e.key === ' ';
                              const isNumber = /^[A-Za-z]$/;
                              if (!isNumber.test(e.key) && !isbackspace && !isSpace) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </Field>      </Stack> </Stack>

                        {/* <Label>Bank Name:</Label>
                      <Field validationMessage={errors && errors.BankName}>
                        <Input
                          type="text"
                          value={formData.Other.BankName}
                          name="BankName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field> */}
                      </div>

                      <div>
                        <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Bank Address</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.BankAddress}>
                          <Input
                            type="text"
                            value={formData.Other.BankAddress}
                            name="BankAddress"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Field>      </Stack> </Stack>
                        {/* <Label>Bank Address:</Label>
                      <Field validationMessage={errors && errors.BankAddress}>
                        <Input
                          type="text"
                          value={formData.Other.BankAddress}
                          name="BankAddress"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Field> */}
                      </div>

                      <div>

                        <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Account Number</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.AccountNumber}>
                          <Input
                            type="text"
                            value={formData.Other.AccountNumber}
                            name="AccountNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={(e) => {
                              const isbackspace = e.key === 'Backspace';
                              const isSpace = e.key === ' ';
                              const isNumber = /^[0-9]$/;
                              if (!isNumber.test(e.key) && !isbackspace && !isSpace) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </Field>      </Stack> </Stack>
                        {/* <Label>Account Number:</Label>
                      <Field validationMessage={errors && errors.AccountNumber}>
                        <Input
                          type="text"
                          value={formData.Other.AccountNumber}
                          name="AccountNumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onKeyDown={(e) => {
                            const isbackspace = e.key === 'Backspace';
                            const isNumber = /^[0-9]$/;
                            if (!isNumber.test(e.key) && !isbackspace) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </Field> */}
                      </div>

                      <div>

                        <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >IfSC code </Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.IFSCCode}>
                          <Input
                            type="text"
                            value={formData.Other.IFSCCode}
                            name="IFSCCode"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={(e) => {
                              const isbackspace = e.key === 'Backspace';
                              const isSpace = e.key === ' ';
                              const isNumber = /^[0-9]$/;
                              if (!isNumber.test(e.key) && !isbackspace && !isSpace) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </Field>      </Stack> </Stack>
                        {/* <Label>IFSC Code:</Label>
                      <Field validationMessage={errors && errors.IFSCCode}>
                        <Input
                          type="text"
                          value={formData.Other.IFSCCode}
                          name="IFSCCode"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onKeyDown={(e) => {
                            const isbackspace = e.key === 'Backspace';
                            const isNumber = /^[0-9]$/;
                            if (!isNumber.test(e.key) && !isbackspace) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </Field> */}
                      </div>

                      <div>

                        <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Swift Code</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.SwiftCode}>
                          <Input
                            type="text"
                            value={formData.Other.SwiftCode}
                            name="SwiftCode"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={(e) => {
                              const isbackspace = e.key === 'Backspace';
                              const isSpace = e.key === ' ';
                              const isNumber = /^[0-9]$/;
                              if (!isNumber.test(e.key) && !isbackspace && !isSpace) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </Field>      </Stack> </Stack>

                        {/* <Label>Swift Code:</Label>
                      <Field validationMessage={errors && errors.SwiftCode}>
                        <Input
                          type="text"
                          value={formData.Other.SwiftCode}
                          name="SwiftCode"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onKeyDown={(e) => {
                            const isbackspace = e.key === 'Backspace';
                            const isNumber = /^[0-9]$/;
                            if (!isNumber.test(e.key) && !isbackspace) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </Field> */}
                      </div>

                      <div>

                        <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >IBAN Number</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.IBANNumber}>
                          <Input
                            type="text"
                            value={formData.Other.IBANNumber}
                            name="IBANNumber"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={(e) => {
                              const isbackspace = e.key === 'Backspace';
                              const isSpace = e.key === ' ';
                              const isNumber = /^[0-9]$/;
                              if (!isNumber.test(e.key) && !isbackspace && !isSpace) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </Field>      </Stack> </Stack>

                        {/* <Label>IBAN Number:</Label>
                      <Field validationMessage={errors && errors.IBANNumber}>
                        <Input
                          type="text"
                          value={formData.Other.IBANNumber}
                          name="IBANNumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onKeyDown={(e) => {
                            const isbackspace = e.key === 'Backspace';
                            const isNumber = /^[0-9]$/;
                            if (!isNumber.test(e.key) && !isbackspace) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </Field> */}
                      </div>
                    </Stack> </>
                )}

              <div>
                <p style={{ marginTop: 20, fontWeight: 500 }}>Acknowledgement*</p>
                <div>      <Stack horizontal className={styles.Right}>
                  <Field validationMessage={checkBoxError}>
                    <Label className={styles.lbl} >
                      <Checkbox
                        className={styles.checkboxspace}
                        checked={option1}
                        id='check 1'
                        name="option 1"
                        onChange={() => (setOption1(!option1))}

                        label="'I understand that my request for a refund will be processed in/ accordance with the Fees, Charges & Refund Policy.'"
                      />
                      <Checkbox
                        className={styles.checkboxspace}
                        checked={option2}
                        id='check 2'
                        name="option 2"
                        onChange={() => (setOption2(!option2))}
                        label='I understand that Winslow College will not transfer any funds to a third party unless I explicitly request it in writing, in which case Winslow College shall be released of any responsibility in relation to the refund once the funds have been transferred as requested.'
                      /> <Checkbox
                        className={styles.checkboxspace}
                        checked={option3}
                        id='check 3'
                        name="option 3"
                        onChange={() => (setOption3(!option3))}
                        label='Signing this form does not mean that it is approved, you need to wait for Winslow College`s approval communication'
                      /></Label>  </Field>

                </Stack>


                </div>

                <Stack horizontal style={{ marginTop: 20 }} className={styles.Right}><Label className={styles.lbl} required >Signature:</Label>       <Stack className={styles.txtfield}> <Field>
                  <Signature errors={signerrors} setErrors={setsignerrors} onData={setSignData} />
                </Field>      </Stack> </Stack>



                {/* <Stack horizontal className={styles.Right} style={{ marginTop: 15 }}><Label className={styles.lbl} required >DATE:</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.Date}>
                  <DatePicker
                    allowTextInput
                    placeholder="Select a date..."
                    // className={styles.control}
                    onSelectDate={(date) => _onDateChanged(date, "Date")}
                  />
                </Field>      </Stack> </Stack> */}


              </div>
              <PrimaryButton type="button" onClick={onPrevious}>Previous</PrimaryButton>
              <Stack className={styles.left}>
                <PrimaryButton className={styles.btn} type='submit' text='Submit' style={{ border: 'outset 20px lightgreen', fontFamily: 'sans-serif', color: 'white', fontWeight: 20, fontSize: 18 }} /> </Stack>
            </form>

          </Stack>
          {/* <Stack className={styles.left}><PrimaryButton className={styles.btn} onClick={handlesubmit} type='submit' text='Submit' style={{ border: 'outset 20px lightgreen', fontFamily: 'sans-serif', color: 'white', fontWeight: 20, fontSize: 18 }} /> </Stack> */}

        </Stack>


      </Stack>
    </>
  )
}

export default Refundform2