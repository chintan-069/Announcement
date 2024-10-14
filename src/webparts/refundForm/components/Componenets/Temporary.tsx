/* eslint-disable max-lines */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// import * as React from 'react';
// import { useState } from 'react';
// import * as yup from 'yup';
// import { useFormContext } from '../../../../Context/Notes/NoteContext'; // Adjust the path as needed
// import { Label, Checkbox, PrimaryButton } from '@fluentui/react';
// import { Field, RadioGroup, Radio, Input } from '@fluentui/react-components';

// export interface errorprops {
//   fullName?: string,
//   address?: string,
//   studentId?: string;
//   emailAddress?: string,
//   primaryPhone?: string,
//   dateOfBirth?: string,
//   course?: string,
//   courseStartDate?: string,

//   TypeOfRefund?: string
//   Amount?: string
//   Reason?: string
//   SuppportDocument?: string
//   Acknowledgement?: string
//   Signature?: string
//   Date?: string

//   AccountName?: string
//   BSB?: string
//   AccoundNumber?: string
//   Currency?: string
//   Country?: string

//   BeneficiaryName?: string
//   BeneficiaryAddress?: string
//   BankName?: string
//   BankAddress?: string
//   AccountNumber?: string
//   IFSCCode?: string
//   SwiftCode?: string
//   IBANNumber?: string
// }

// const formSchema = yup.object().shape({
//   TypeOfRefund: yup.string().required("TypeOfRefund is required").trim(),
//   Amount: yup.string().required("Amount is required").trim(),
//   Reason: yup.string().required("Reason is required").trim(),
//   SuppportDocument: yup.string().required("SuppportDocument is required").trim(),
//   Acknowledgement: yup.string().required("Acknowledgement is required"),
//   Signature: yup.string().required('Signature is required').trim(),
//   Date: yup.string().required('Date is required'),
//   AccountName: yup.string().when('TypeOfRefund', {
//     is: 'Onshore transfer(australian)',
//     then: schema => schema.required('Account Name is required').trim(),
//     otherwise: schema => schema.notRequired()
//   }),
//   BSB: yup.string().when('TypeOfRefund', {
//     is: 'Onshore transfer(australian)',
//     then: schema => schema.required('BSB is required').trim(),
//     otherwise: schema => schema.notRequired()
//   }),
//   AccoundNumber: yup.string().when('TypeOfRefund', {
//     is: 'Onshore transfer(australian)',
//     then: schema => schema.required('Account Number is required').trim(),
//     otherwise: schema => schema.notRequired()
//   }),
//   Currency: yup.string().when('TypeOfRefund', {
//     is: 'Onshore transfer(australian)',
//     then: schema => schema.required('Currency is required').trim(),
//     otherwise: schema => schema.notRequired()
//   }),
//   Country: yup.string().when('TypeOfRefund', {
//     is: 'Onshore transfer(australian)',
//     then: schema => schema.required('Country is required').trim(),
//     otherwise: schema => schema.notRequired()
//   }),
//   BeneficiaryName: yup.string().when('TypeOfRefund', {
//     is: 'AUD',
//     then: schema => schema.required('Beneficiary Name is required').trim(),
//     otherwise: schema => schema.notRequired()
//   }),
//   BeneficiaryAddress: yup.string().when('TypeOfRefund', {
//     is: 'AUD',
//     then: schema => schema.required('Beneficiary Address is required').trim(),
//     otherwise: schema => schema.notRequired()
//   }),
//   BankName: yup.string().when('TypeOfRefund', {
//     is: 'AUD',
//     then: schema => schema.required('Bank Name is required').trim(),
//     otherwise: schema => schema.notRequired()
//   }),
//   BankAddress: yup.string().when('TypeOfRefund', {
//     is: 'AUD',
//     then: schema => schema.required('Bank Address is required').trim(),
//     otherwise: schema => schema.notRequired()
//   }),
//   AccountNumber: yup.string().when('TypeOfRefund', {
//     is: 'AUD',
//     then: schema => schema.required('Account Number is required').trim(),
//     otherwise: schema => schema.notRequired()
//   }),
//   IFSCCode: yup.string().when('TypeOfRefund', {
//     is: 'AUD',
//     then: schema => schema.required('IFSC Code is required').trim(),
//     otherwise: schema => schema.notRequired()
//   }),
//   SwiftCode: yup.string().when('TypeOfRefund', {
//     is: 'AUD',
//     then: schema => schema.required('Swift Code is required').trim(),
//     otherwise: schema => schema.notRequired()
//   }),
//   IBANNumber: yup.string().when('TypeOfRefund', {
//     is: 'AUD',
//     then: schema => schema.required('IBAN Number is required').trim(),
//     otherwise: schema => schema.notRequired()
//   }),
// });


// const RefundForm = ({ context }: { context: any }) => {
//   const { formData, setFormData } = useFormContext();
//   const [errors, setErrors] = useState<errorprops>({});
//   const [option1, setOption1] = useState({ value: false });
//   const [option2, setOption2] = useState({ value: false });
//   const [option3, setOption3] = useState({ value: false });
//   const [selectedRefundType, setSelectedRefundType] = useState<string>('');

//   const handleChange = (e: { target: { name: any; value: any; }; }) => {
//     const { name, value } = e.target;
//     if (name === "TypeOfRefund") {
//       setSelectedRefundType(value);
//     }
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       registration2: {
//         ...prevFormData.registration2,
//         [name]: value,
//       },
//     }));
//   };

//   // const handleDateChange = (date: { toISOString: () => any; }) => {
//   //   if (date) {
//   //     setFormData((prevFormData) => ({
//   //       ...prevFormData,
//   //       registration2: {
//   //         ...prevFormData.registration2,
//   //         Date: date.toISOString(),
//   //       },
//   //     }));
//   //   }
//   // };

//   const handleBlur = async (e: any) => {
//     const { name, value } = e.target;
//     try {
//       await formSchema.validateAt(name, { [name]: value });
//       setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
//     } catch (error) {
//       setErrors(prevErrors => ({ ...prevErrors, [name]: (error as any).message }));
//     }
//   };

//   const handleSubmit = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();

//     try {
//       await formSchema.validate(formData.registration2, { abortEarly: false });
//       console.log('Validation successful');
//       // Proceed with form submission logic here
//     } catch (error) {
//       const validationErrors: any = {};
//       (error as any).inner.forEach((err: { path: string | number; message: any; }) => {
//         validationErrors[err.path] = err.message;
//       });
//       setErrors(validationErrors);
//       console.log('Validation errors:', validationErrors);
//     }
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <Label>Select Type Of Refund:</Label>
//           <Field validationMessage={errors && errors.TypeOfRefund}>
//             <RadioGroup layout="horizontal">
//               <Radio
//                 value="Onshore transfer(australian)"
//                 name="TypeOfRefund"
//                 label="Onshore transfer(australian)"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//               <Radio
//                 value="AUD"
//                 name="TypeOfRefund"
//                 label="AUD"
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//               />
//             </RadioGroup>
//           </Field>
//         </div>

//         <div>
//           <Label>Amount:</Label>
//           <Field validationMessage={errors && errors.Amount}>
//             <Input
//               type="text"
//               value={formData.registration2.Amount}
//               name="Amount"
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//           </Field>
//         </div>

//         <div>
//           <Label>Reason:</Label>
//           <Field validationMessage={errors && errors.Reason}>
//             <Input
//               type="text"
//               value={formData.registration2.Reason}
//               name="Reason"
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//           </Field>
//         </div>

//         <div>
//           <Label>Support Document:</Label>
//           <Field validationMessage={errors && errors.SuppportDocument}>
//             <Input
//               type="text"
//               value={formData.registration2.SuppportDocument}
//               name="SuppportDocument"
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//           </Field>
//         </div>

//         <div>
//           <Label>Acknowledgement:</Label>
//           <Checkbox
//             checked={option1.value}
//             name="Acknowledgement"
//             onChange={() => setOption1(prev => ({ ...prev, value: !prev.value }))}
//             label="Option 1"
//           />
//           <Checkbox
//             checked={option2.value}
//             name="Acknowledgement"
//             onChange={() => setOption2(prev => ({ ...prev, value: !prev.value }))}
//             label="Option 2"
//           />
//           <Checkbox
//             checked={option3.value}
//             name="Acknowledgement"
//             onChange={() => setOption3(prev => ({ ...prev, value: !prev.value }))}
//             label="Option 3"
//           />
//         </div>

//         <div>
//           <Label>Signature:</Label>
//           <Field validationMessage={errors && errors.Signature}>
//             <Input
//               type="text"
//               value={formData.registration2.Signature}
//               name="Signature"
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//           </Field>
//         </div>
// {/* 
//         <div>
//           <Label>Date:</Label>
//           <Field validationMessage={errors && errors.Date}>
//             <DatePicker
//               allowTextInput
//               placeholder="Select a date..."
//               value={formData.registration2.Date ? new Date(formData.registration2.Date) : undefined}
//               onSelectDate={handleDateChange}
//               onBlur={handleBlur}
//             />
//           </Field>
//         </div> */}

//         {selectedRefundType === "Onshore transfer(australian)" && (
//           <>
//             <div>
//               <Label>Account Name:</Label>
//               <Field validationMessage={errors && errors.AccountName}>
//                 <Input
//                   type="text"
//                   value={formData.Australian.AccountName}
//                   name="AccountName"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>
//             </div>

//             <div>
//               <Label>BSB:</Label>
//               <Field validationMessage={errors && errors.BSB}>
//                 <Input
//                   type="text"
//                   value={formData.Australian.BSB}
//                   name="BSB"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>
//             </div>

//             <div>
//               <Label>Account Number:</Label>
//               <Field validationMessage={errors && errors.AccoundNumber}>
//                 <Input
//                   type="text"
//                   value={formData.Australian.AccoundNumber}
//                   name="AccoundNumber"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>
//             </div>

//             <div>
//               <Label>Currency:</Label>
//               <Field validationMessage={errors && errors.Currency}>
//                 <Input
//                   type="text"
//                   value={formData.Other.Currency}
//                   name="Currency"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>
//             </div>

//             <div>
//               <Label>Country:</Label>
//               <Field validationMessage={errors && errors.Country}>
//                 <Input
//                   type="text"
//                   value={formData.Other.Country}
//                   name="Country"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>
//             </div>
//           </>
//         )}

//         {selectedRefundType === "AUD" && (
//           <>
//             <div>
//               <Label>Beneficiary Name:</Label>
//               <Field validationMessage={errors && errors.BeneficiaryName}>
//                 <Input
//                   type="text"
//                   value={formData.Other.BeneficiaryName}
//                   name="BeneficiaryName"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>
//             </div>

//             <div>
//               <Label>Beneficiary Address:</Label>
//               <Field validationMessage={errors && errors.BeneficiaryAddress}>
//                 <Input
//                   type="text"
//                   value={formData.Other.BeneficiaryAddress}
//                   name="BeneficiaryAddress"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>
//             </div>

//             <div>
//               <Label>Bank Name:</Label>
//               <Field validationMessage={errors && errors.BankName}>
//                 <Input
//                   type="text"
//                   value={formData.Other.BankName}
//                   name="BankName"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>
//             </div>

//             <div>
//               <Label>Bank Address:</Label>
//               <Field validationMessage={errors && errors.BankAddress}>
//                 <Input
//                   type="text"
//                   value={formData.Other.BankAddress}
//                   name="BankAddress"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>
//             </div>

//             <div>
//               <Label>Account Number:</Label>
//               <Field validationMessage={errors && errors.AccountNumber}>
//                 <Input
//                   type="text"
//                   value={formData.Other.AccountNumber}
//                   name="AccountNumber"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>
//             </div>

//             <div>
//               <Label>IFSC Code:</Label>
//               <Field validationMessage={errors && errors.IFSCCode}>
//                 <Input
//                   type="text"
//                   value={formData.Other.IFSCCode}
//                   name="IFSCCode"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>
//             </div>

//             <div>
//               <Label>Swift Code:</Label>
//               <Field validationMessage={errors && errors.SwiftCode}>
//                 <Input
//                   type="text"
//                   value={formData.Other.SwiftCode}
//                   name="SwiftCode"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>
//             </div>

//             <div>
//               <Label>IBAN Number:</Label>
//               <Field validationMessage={errors && errors.IBANNumber}>
//                 <Input
//                   type="text"
//                   value={formData.Other.IBANNumber}
//                   name="IBANNumber"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>
//             </div>
//           </>
//         )}

//         <div>
//           <PrimaryButton type="submit">Submit</PrimaryButton>
//         </div>
//       </form>
//     </>
//   );
// }

// export default RefundForm;

// // ==========================================================================================



// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // /* eslint-disable @typescript-eslint/explicit-function-return-type */
// // import * as React from 'react';
// // import styles from '../RefundForm.module.scss';
// // import { useFormContext } from '../../../../Context/Notes/NoteContext';
// // import { validateData, userSchema } from '../../../services/YupValidation/service';
// // import { useId, Field, Input, RadioGroup, Radio, Button, Label } from '@fluentui/react-components';
// // import { DatePicker, Stack } from '@fluentui/react';

// // // import { sp } from './pnpconfig';
// // // import { useFormContext } from '../../../context';
// // // import { registration } from '../../../lib/Context/Notes/NoteContext';

// // // jarurat nathi .. context ma use karie to

// // interface errorprops {
// //   fullName?: string,
// //   dateOfBirth?: string,
// //   address?: string,
// //   emailAddress?: string,
// //   primaryPhone?: string,
// //   studentId?: string,
// //   courseStartDate?: string,
// //   course?: string,
// // }
// // const Refundform = (props: any) => {
// //   const { formData, setFormData } = useFormContext();
// //   const inputId = useId("input");
// //   const [errors, setErrors] = React.useState<errorprops>({
// //   });


// //   const postData = async () => {
// //     // setIsPopupVisible(true);
// //     console.log("post");
// //     // setTimeout(async () => {
// //     // const checkin = (data.checkIn).toString();
// //     const iar = await props._sp.web.lists.getByTitle(`${props.listname}`).items.add({
// //       Title: "data",
// //       fullName: formData.registration.fullName,
// //       dateOfBirth: formData.registration.dateOfBirth,
// //       address: formData.registration.address,
// //       emailAddress: formData.registration.emailAddress,
// //       primaryPhone: formData.registration.primaryPhone,
// //       studentId: formData.registration.studentId,
// //       courseStartDate: formData.registration.courseStartDate,
// //       course: formData.registration.course,
// //     });
// //     console.log(iar);
// //     // setTimeout(() => {
// //     //   <PopupBasicExample toggleIsPopupVisible={toggleIsPopupVisible}/>
// //     // }, 2000);
// //     // }, 5000);

// //   }


// //   const handleSubmit = async (e: React.FormEvent) => {

// //     e.preventDefault();
// //     await validateData(formData.registration).then((res) =>
// //     (res.success ? (
// //       console.log("submit"),
// //       setTimeout(async () => {
// //         await postData()
// //       }, 2000))
// //       : setErrors(res.data)
// //     )).catch((err: React.SetStateAction<errorprops>) => setErrors(err))
// //     // console.log(result);
// //     // (result === true ? postData(formData) : setErrors(result));
// //     //   await validateData(formData).then((res) => (res.success ? postData(res.data) : setErrors(res.data))
// //     // ).catch(err => setErrors(err))
// //     // setErrors(result);

// //   }
// //   // console.log(handleSubmit());



// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     // setInputValue(prevState => ({ ...prevState, [name]: value }));
// //     console.log(name, value);

// //     setFormData(prevState => ({
// //       ...prevState,
// //       // ...prevState.eventPlanning,  //cnotext state..
// //       registration: {
// //         ...prevState.registration,
// //         [name]: value
// //       }
// //     }));
// //     setErrors(prevError => ({ ...prevError, [name]: '' })); // Clear error for the current field

// //   };
// //   const _onDateChanged = (date: Date | null | undefined, text: string): void => {
// //     setFormData(prevState => ({
// //       ...prevState,
// //       // ...prevState.eventPlanning,  //cnotext state..
// //       registration: {
// //         ...prevState.registration,
// //         [text]: date
// //       }
// //     }));
// //   }

// //   const handleError = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     // console.log(name, value);
// //     try {

// //       await userSchema.validateAt(name, { [name]: value }, { strict: true })

// //       setErrors((previousError) => ({ ...previousError, [name]: undefined }))

// //     } catch (error) {
// //       // console.log(error);
// //       setErrors(previouError => ({ ...previouError, [name]: error.errors[0] }))

// //     }
// //     // setErrors({...errors, [name] : })
// //   }
// //   // for get items.

// //   // React.useEffect(() => {
// //   //     getlibrry().catch((er: any) => console.log(er)
// //   //     );
// //   // }, []);



// //   return (
// //     <>
// //       <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >First Name</Label>       <Stack className={styles.txtfield}>    <Field validationMessage={errors && errors.fullName}>
// //         <Input id={inputId} type='text' value={formData.registration.fullName} name='fullName' onChange={handleChange} onBlur={handleError} />
// //       </Field>        </Stack> </Stack>
// //       <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Student ID</Label>       <Stack className={styles.txtfield}>  <Field validationMessage={errors && errors.address}>
// //         <Input id={inputId} type='text' value={formData.registration.address} name='address' onChange={handleChange} onBlur={handleError} />
// //       </Field>     </Stack> </Stack>
// //       <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Date of Birth</Label>    <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.studentId}>
// //         <Input id={inputId} type='text' onKeyDown={(e) => {
// //           const isbackspace = e.key === 'Backspace';
// //           const isNumber = /^[0-9]$/;
// //           if (!isNumber.test(e.key) && !isbackspace) {
// //             e.preventDefault();
// //           }
// //         }} value={formData.registration.studentId.toString()} name='primaryPhone' onChange={handleChange} onBlur={handleError} />
// //       </Field></Stack></Stack>
// //       <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Email </Label>           <Stack className={styles.txtfield}>   <Field validationMessage={errors && errors.course}>
// //         <Input id={inputId} value={formData.registration.course} name='state' onChange={handleChange} onBlur={handleError} />
// //       </Field>              </Stack></Stack>
// //       <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Phone Number</Label>     <Stack className={styles.txtfield}>  <Field validationMessage={errors && errors.emailAddress}>
// //         <Input id={inputId} type='text' value={formData.registration.emailAddress} name='emailAddress' onChange={handleChange} onBlur={handleError} />
// //       </Field></Stack> </Stack>
// //       <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Address</Label>          <Stack className={styles.txtfield}>   <Field validationMessage={errors && errors.primaryPhone}>
// //         <Input id={inputId} type='text' onKeyDown={(e) => {
// //           const isbackspace = e.key === 'Backspace';
// //           const isNumber = /^[0-9]$/;
// //           if (!isNumber.test(e.key) && !isbackspace) {
// //             e.preventDefault();
// //           }
// //         }} value={formData.registration.primaryPhone.toString()} name='primaryPhone' onChange={handleChange} onBlur={handleError} />
// //       </Field>          </Stack> </Stack>
// //       <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Course</Label>           <Stack className={styles.txtfield}>  <Field validationMessage={errors && errors.dateOfBirth}>
// //         <DatePicker
// //           allowTextInput
// //           placeholder="Select a date..."
// //           // className={styles.control}
// //           onSelectDate={(date) => _onDateChanged(date, "dateOfBirth")}
// //         />
// //       </Field>              </Stack></Stack>
// //       <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Course</Label>           <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.courseStartDate}>
// //         <DatePicker
// //           allowTextInput
// //           placeholder="Select a date..."
// //           // className={styles.control}
// //           onSelectDate={(date) => _onDateChanged(date, "courseStartDate")}
// //         />
// //       </Field>              </Stack></Stack>





// //       <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Course</Label>           <Stack className={styles.txtfield}> <TextField onChange={HandleChange} value={inputValue.Course} name="Course" errorMessage={inputValue.error.Course} />               </Stack></Stack>
// //       <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Course Start Date</Label><Stack className={styles.txtfield}> <TextField onChange={HandleChange} value={inputValue.CourseDate} name="CourseDate" errorMessage={inputValue.error.CourseDate} />   </Stack></Stack>
// //       <form action="" onSubmit={handleSubmit}>
// //         <div>
// //           <Label>
// //             FULLNAME
// //           </Label>
// //           <Field validationMessage={errors && errors.fullName}>
// //             <Input id={inputId} type='text' value={formData.registration.fullName} name='fullName' onChange={handleChange} onBlur={handleError} />
// //           </Field>

// //         </div>
// //         {/* use address controll */}
// //         <div>
// //           <Label>
// //             ADDRESS
// //           </Label>
// //           <Field validationMessage={errors && errors.address}>
// //             <Input id={inputId} type='text' value={formData.registration.address} name='address' onChange={handleChange} onBlur={handleError} />
// //           </Field>
// //         </div>
// //         <div className={styles.officeUse}>
// //           <div className={`${styles.edate} ${styles.margin20}`}>
// //             <Label>
// //               CITY
// //             </Label>
// //             <Field validationMessage={errors && errors.studentId}>
// //               <Input id={inputId} type='text' onKeyDown={(e) => {
// //                 const isbackspace = e.key === 'Backspace';
// //                 const isNumber = /^[0-9]$/;
// //                 if (!isNumber.test(e.key) && !isbackspace) {
// //                   e.preventDefault();
// //                 }
// //               }} value={formData.registration.studentId.toString()} name='primaryPhone' onChange={handleChange} onBlur={handleError} />
// //             </Field>
// //           </div>
// //           <div className={`${styles.edate} ${styles.margin20}`}>
// //             <Label>STATE
// //             </Label>
// //             <Field validationMessage={errors && errors.course}>
// //               <Input id={inputId} value={formData.registration.course} name='state' onChange={handleChange} onBlur={handleError} />
// //             </Field>
// //           </div>
// //         </div >
// //         <div>
// //           <Label>EMAIL ADDRESS:
// //           </Label>
// //           <Field validationMessage={errors && errors.emailAddress}>
// //             <Input id={inputId} type='text' value={formData.registration.emailAddress} name='emailAddress' onChange={handleChange} onBlur={handleError} />
// //           </Field>
// //         </div>
// //         <div className={styles.officeUse}>
// //           <div className={`${styles.margin20} ${styles.edate}`}>
// //             <Label>
// //               PRIMARY PHONE:
// //             </Label>
// //             <Field validationMessage={errors && errors.primaryPhone}>
// //               <Input id={inputId} type='text' onKeyDown={(e) => {
// //                 const isbackspace = e.key === 'Backspace';
// //                 const isNumber = /^[0-9]$/;
// //                 if (!isNumber.test(e.key) && !isbackspace) {
// //                   e.preventDefault();
// //                 }
// //               }} value={formData.registration.primaryPhone.toString()} name='primaryPhone' onChange={handleChange} onBlur={handleError} />
// //             </Field>
// //           </div>
// //         </div >
// //         {/* use date controll */}
// //         <div className={styles.officeUse} >
// //           <div className={`${styles.edate} ${styles.margin20}`}>
// //             <Label>
// //               DATE OF BIRTH:
// //             </Label>
// //             <Field validationMessage={errors && errors.dateOfBirth}>
// //               <DatePicker
// //                 allowTextInput
// //                 placeholder="Select a date..."
// //                 // className={styles.control}
// //                 onSelectDate={(date) => _onDateChanged(date, "dateOfBirth")}
// //               />
// //             </Field>
// //           </div>
// //           <div className={`${styles.edate} ${styles.margin20}`}>
// //             <Label>
// //               Course Start Date:
// //             </Label>
// //             <Field validationMessage={errors && errors.courseStartDate}>
// //               <DatePicker
// //                 allowTextInput
// //                 placeholder="Select a date..."
// //                 // className={styles.control}
// //                 onSelectDate={(date) => _onDateChanged(date, "courseStartDate")}
// //               />
// //             </Field>
// //           </div>
// //         </div>
// //         {/* date controll use */}

// //         <Stack style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10 }}>

// //           <Button onClick={handleSubmit}>Next</Button>
// //         </Stack>
// //       </form >



// //     </>
// //   );
// // }

// // export default Refundform



// ==============================================================================================================
// ==============================================================================================================
/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { Checkbox, DatePicker, IconButton, Label, PrimaryButton, Stack } from '@fluentui/react'
// import { Field, RadioGroup, Radio, Input } from '@fluentui/react-components';
// import * as  React from 'react'
// import { errorprops } from './Refundform';
// import { formSchema, validateData2 } from '../../../../Validation/ResgistrationSchema';
// import { useFormContext } from '../../../../Context/Notes/NoteContext';
// // import Signature from './Sinature';
// import { SPHttpClient } from '@microsoft/sp-http';
// import styles from '../RefundForm.module.scss';
// import Signature from './Sinature';
// // import { uploadfile } from '../../../services/uploadfile';
// // import * as yup from 'yup';
// // import { Australian, Other } from '../../../../../lib/Context/Notes/NoteContext';
// const Refundform2 = ({ onNext, context, _sp }: { onNext: () => void, context: any, _sp: any }) => {


//   const [option1, setOption1] = React.useState(false);
//   const [option2, setOption2] = React.useState(false);
//   const [option3, setOption3] = React.useState(false);
//   const [errors, setErrors] = React.useState<errorprops>({});
//   const [selectedRefundType, setSelectedRefundType] = React.useState<string>('');

//   const [signerrors, setsignerrors] = React.useState<string>("")
// const [signData, setsignData] = React.useState('')

//   const { formData, setFormData } = useFormContext()
//   const [UploadError, setUploadError] = React.useState("")

//   const postData = async () => {
//     // setIsPopupVisible(true);
//     console.log("post");
//     // setTimeout(async () => {
//     // const checkin = (data.checkIn).toString();
//     const iar = await _sp.web.lists.getByTitle(`RefundForm`).items.add({
//       Title: "data",
//       // firstPage: { name: '', email: '', calendar: ''}, // typeOfFunctions: '' },
//       TypeOfRefund: formData.registration2.TypeOfRefund,
//       Amount: formData.registration2.Amount,
//       Reason: formData.registration2.Reason,
//       SuppportDocument: "support",
//       Acknowledgement1: option1 ? "true" : "false",
//       Acknowledgement2: option2 ? "true" : "false",
//       Acknowledgement3: option3 ? "true" : "false",
//       Signature: "signature",
//       Date: formData.registration2.Date,
//       // secondPage: { numberOfPeople: '', guestBreakdown: '', nonDrinkers: '', averageAge: '', typeOfEvent: '', },
//       AccountName: formData.Australian.AccountName,
//       BSB: formData.Australian.BSB,
//       AccoundNumber: formData.Australian.AccoundNumber,
//       Currency: formData.Other.Currency,
//       Country: formData.Other.Country,
//       BeneficiaryName: formData.Other.BeneficiaryName,
//       BeneficiaryAddress: formData.Other.BeneficiaryAddress,
//       BankName: formData.Other.BankName,
//       BankAddress: formData.Other.BankAddress,
//       AccountNumber: formData.Other.AccountNumber,
//       IFSCCode: formData.Other.IFSCCode,
//       SwiftCode: formData.Other.SwiftCode,
//       IBANNumber: formData.Other.IBANNumber,
//       fullName: formData.registration.fullName,
//       address: formData.registration.address,
//       studentId: formData.registration.studentId,
//       primaryPhone: formData.registration.primaryPhone,
//       emailAddress: formData.registration.emailAddress,
//       dateOfBirth: formData.registration.emailAddress,
//       courseStartDate: formData.registration.courseStartDate,
//       course: formData.registration.course,
//     });

//     // });
//     console.log(iar);
//     // setTimeout(() => {
//     //   <PopupBasicExample toggleIsPopupVisible={toggleIsPopupVisible}/>
//     // }, 2000);
//     // }, 5000);

//   }
//   const setSignData = (data :any) => {
//     // set state.
//   setsignData(data);
//   }
  
//   // const get = async () => {
//   //   // const items: any[] = await props._sp.web.lists.getByTitle("Student").items();
//   //   const items: any[] = await _sp.web.lists.getByTitle("RefundForm").items();

//   //   // console.log(items);
//   //   // setInitialItems(items);
//   // }
//   // React.useEffect(() => {
//   //   get().catch(err => console.log(err)
//   //   )
//   // })
//   //
//   const [checkBoxError, setCheckBoxError] = React.useState("");
//   const createLibrary = async () => {

//     // eslint-disable-next-line no-void
//     await _sp.web.lists.add(`${formData.registration.fullName}`, '', 101)
//         .then((_result: any) => {
//             console.log(`Library created with name: ${formData.registration.fullName}`);
//         });

// }
//   // const uploadFile = async (e: React.FormEvent) => {
//   //   const handlesubmit = async (e: React.FormEvent) => {
//   //     // eslint-disable-next-line prefer-const
//   //     e.preventDefault();


//   //     const sample: any[] = [];
//   //     setsignerrors('Image is required')
//   // try{
//   //     if (option1) {
//   //       sample.push(option1.toString());
//   //     } if (option2) {
//   //       sample.push(option2.toString() );
//   //     } if (option3) {
//   //       sample.push(option3.toString());
//   //     }
//   //     console.log(sample.length);

//   //     if (sample.length > 2 || sample.length < 1 || sample.length === 1) {
//   //       setCheckBoxError("acknowledgement is required.");
//   //       await formSchema.validate(formData.registration2, { abortEarly: false });
//   //       // return;
//   //       const files = (document.getElementById('Uploadfile') as HTMLInputElement).files;

//   //       if (!files || files.length === 0) {
//   //         setUploadError('No file selected for upload.');
//   //         return;
//   //       }
//   //     } else {
//   //       setCheckBoxError("");

//   //       // if (option1.value) {
//   //         setFormData((prefrences) => ({
//   //           ...prefrences,
//   //           registration2:{
//   //             ...prefrences.registration2,
//   //             Acknowledgement1: option1.toString() 
//   //           }
//   //         }));
//   //       // } if (option2.value) {
//   //         setFormData((prefrences) => ({
//   //           ...prefrences,
//   //           registration2: {
//   //             ...prefrences.registration2,
//   //             Acknowledgement2: option2.toString()  
//   //           }
//   //         }));
//   //       // } if (option3.value) {
//   //         setFormData((prefrences) => ({
//   //           ...prefrences,
//   //           registration2: {
//   //             ...prefrences.registration2,
//   //             Acknowledgement3: option3.toString() 
//   //           }
//   //         }));
//   //       // }
//   //       await postData().then(res => console.log(res)
//   //     ).catch(err => console.log(err)
//   //     )

//   //     try {
//   //       console.log('Validation successful');
//   //       // Proceed with form submission logic here
//   //       const files = (document.getElementById('Uploadfile') as HTMLInputElement).files;

//   //     if (!files || files.length === 0) {
//   //       setUploadError('No file selected for upload.');
//   //       return;
//   //     }
//   //     for (let i = 0; i < files.length; i++) {
//   //       const file = files[i];
//   //       const spopts = {
//   //         headers: {
//   //           "Accept": "application/json",
//   //           "Content-Type": "application/json"
//   //         },
//   //         body: file
//   //       };

//   //       const url = `${context.pageContext.web.absoluteUrl}/_api/W/Lists/getByTitle('${formData.registration.fullName}')/RootFolder/Files/Add(url='WI4.pdf',overwrite=true)`;

//   //       try {
//   //         const response = await context.spHttpClient.post(url, SPHttpClient.configurations.v1, spopts);

//   //         const responseJSON = await response.json();
//   //         console.log(responseJSON.Name);
//   //         // onNext();
//   //         // validateForm().catch((err:any) => console.log(err))



//   //       } catch (err) {
//   //         console.error("Error uploading file: ", err);
//   //         setUploadError('Error uploading file. Check console for details.');
//   //       }
//   //     }
//   //     } catch (error) {
//   //       const validationErrors: any = {};
//   //       (error as any).inner.forEach((err: { path: string | number; message: any; }) => {
//   //         validationErrors[err.path] = err.message;
//   //       });
//   //       setErrors(validationErrors);
//   //       console.log('Validation errors:', validationErrors);
//   //     }
//   //     }
//   //   }catch(err){
//   //     console.log(err);

//   //   }
//   //     // console.log(sample);
//   //     // setFormData((prefrences) => ({
//   //     //   ...prefrences,
//   //     //   registration2: {
//   //     //     ...prefrences.registration2,
//   //     //     Acknowledgement: [...sample]
//   //     //   }
//   //     // })

//   //     // );

//   //     // try {
//   //     //   await formSchema.validate(formData.registration2, { abortEarly: false });
//   //     //   console.log('Validation successful');
//   //     //   // Proceed with form submission logic here
//   //     // } catch (error) {
//   //     //   const validationErrors: any = {};
//   //     //   (error as any).inner.forEach((err: { path: string | number; message: any; }) => {
//   //     //     validationErrors[err.path] = err.message;
//   //     //   });
//   //     //   setErrors(validationErrors);
//   //     //   console.log('Validation errors:', validationErrors);
//   //     // }


//   //     console.log("submit");


//   //     // await validateData2(formData.registration).then((res:any) =>
//   //     //    (res.success ? (console.log("success"),onNext()) : setErrors(res.data)))
//   //     //                     .catch((err: React.SetStateAction<errorprops>) => setErrors(err))


//   //   }
//   const handlesubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const sample: any[] = [];
//     setsignerrors('Image is required')
//     // if(signData){
//     //   setsignerrors("sign is require")
//     // }else{
//     //   setsignerrors("")
//     // }
//     if (option1) {
//       sample.push(option1.toString());
//     } if (option2) {
//       sample.push(option2.toString());
//     } if (option3) {
//       sample.push(option3.toString());
//     }
//     console.log(sample.length);
//     if (sample.length > 2 || sample.length < 1 || sample.length === 1) {
//       setCheckBoxError("acknowledgement is required.");
//     }
//     const files = (document.getElementById('Uploadfile') as HTMLInputElement).files;

//     if (!files || files.length === 0) {
//       setUploadError('No file selected for upload.');
//       // return;
//     }else{
//       setUploadError("")
//     }
//     try {
      
//       // setCheckBoxError("");
//       await validateData2(formData.registration2).then((res: any) =>
//         (res.success ? (console.log("success"),setCheckBoxError(""),setUploadError(""),setsignerrors(""),postData(),createLibrary()) : setErrors(res.data)))
//         .catch((err: React.SetStateAction<errorprops>) => setErrors(err))
//       // console.log(result);
     
//       // file upload
//       const files = (document.getElementById('Uploadfile') as HTMLInputElement).files;
        
//         if (!files || files.length === 0) {
//             setUploadError('No file selected for upload.');
//             return;
//         }
    
//         for (let i = 0; i < files.length; i++) {
//             const file = files[i];
//             const spopts = {
//                 headers: {
//                     "Accept": "application/json",
//                     "Content-Type": "application/json"
//                 },
//                 body: file
//             };
    
//             const url = `${context.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('${formData.registration.fullName}')/RootFolder/Files/Add(url='reasonDocument.pdf',overwrite=true)`;
            
    
    
//             try {
//                 const response = await context.spHttpClient.post(url, SPHttpClient.configurations.v1, spopts);
//                 const responseJSON = await response.json();
//                 console.log(responseJSON.Name);
//                 // onNext();
//             } catch (err) {
//                 console.error("Error uploading file: ", err);
//                 setUploadError('Error uploading file. Check console for details.');
//             }
//         }
//         // sign data.
//         const image = {
//           headers: {
//               "Accept": "application/json",
//               "Content-Type": "application/json"
//           },
//           body: signData
//       };
//       const imagefile = `${context.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('${formData.registration.fullName}')/RootFolder/Files/Add(url='image.pdf',overwrite=true)`;
//       try {
//         const response = await context.spHttpClient.post(imagefile, SPHttpClient.configurations.v1, image);
//         const responseJSON = await response.json();
//         console.log(responseJSON.Name);
//         // onNext();
//     } catch (err) {
//         console.error("Error uploading file: ", err);
//         setUploadError('Error uploading file. Check console for details.');
//     }
//     }
//     catch (err) {
//       setErrors(err);
//     }
//   }

//   // console.log(formData.registration2);



//   // const _onCheck = (item: any) => {
//   //   setFormData((preferences: any) => ({

//   //     ...preferences,
//   //     registration2 : {
//   //       ...preferences.registration2,
//   //       Acknowledgement : [...preferences.registration2.Acknowledgement, item.data]
//   //     }
//   //   }))
//   // }
//   // console.log(FormData);

//   const handleChange = (e: { target: { name: any; value: any; }; }) => {
//     const { name, value } = e.target;
//     if (name === "TypeOfRefund") {
//       setSelectedRefundType(value);
//     }
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       registration2: {
//         ...prevFormData.registration2,
//         [name]: value,
//       },
//     }));
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       Australian: {
//         ...prevFormData.Australian,
//         [name]: value,
//       },
//     }));
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       Other: {
//         ...prevFormData.Other,
//         [name]: value,
//       },
//     }));
//   };


//   const _onDateChanged = (date: Date | null | undefined, text: string) => {
//     if(date){
//       setErrors({"Date" : ""});
//     }
//     setFormData((prevState: any) => ({
//       ...prevState,
//       // ...prevState.eventPlanning,  //cnotext state..
//       registration2: {
//         ...prevState.registration2,
//         [text]: date
//       }
//     }));
//   }



//   const handleBlur = async (e: any) => {
//     const { name, value } = e.target;
//     try {
//       await formSchema.validateAt(name, { [name]: value });
//       setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
//     } catch (error) {
//       setErrors(prevErrors => ({ ...prevErrors, [name]: (error as any).message }));
//     }
//   };



//   // const handleError = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//   //   e.preventDefault();
//   //   const { name, value } = e.target;
//   //   console.log(name, value);


//   //   try {

//   //     await formSchema.validateAt(name, { [name]: value }, { strict: true })

//   //     setErrors((previousError) => ({ ...previousError, [name]: undefined }))

//   //   } catch (error) {
//   //     // console.log(error);
//   //     setErrors(previouError => ({ ...previouError, [name]: error.errors[0] }))

//   //   }
//   //   // setErrors({...errors, [name] : })
//   // }

//   // const austrelian = () => {
//   //   return (<>
//   //     <div>
//   //       <Label>
//   //         account name:*
//   //       </Label>
//   //       <Field validationMessage={errors && errors.AccountName}>
//   //         <Input id={inputId} type='text' value={formData.Australian.AccountName} name='AccountName' onChange={handleChange} onBlur={handleError} />
//   //       </Field>
//   //     </div>
//   //     <div>
//   //       <Label>
//   //         BSB:
//   //       </Label>
//   //       <Field validationMessage={errors && errors.BSB}>
//   //         <Input id={inputId} type='text' onKeyDown={(e) => {
//   //           const isbackspace = e.key === 'Backspace';
//   //           const isNumber = /^[0-9]$/;
//   //           if (!isNumber.test(e.key) && !isbackspace) {
//   //             e.preventDefault();
//   //           }
//   //         }} value={formData.Australian.BSB.toString()} name='BSB' onChange={handleChange} onBlur={handleError} />
//   //       </Field>
//   //     </div>
//   //     <div>

//   //     <Stack horizontal className={styles.Right}>
//   //       <Label  className={styles.lbl}>
//   //         Account number:
//   //       </Label>

//   //      <Stack className={styles.txtfield}>
//   //       <Field validationMessage={errors && errors.AccountNumber}>
//   //         <Input id={inputId} type='text' onKeyDown={(e) => {
//   //           const isbackspace = e.key === 'Backspace';
//   //           const isNumber = /^[0-9]$/;
//   //           if (!isNumber.test(e.key) && !isbackspace) {
//   //             e.preventDefault();
//   //           }
//   //         }} value={formData.Australian.AccountNumber.toString()} name='AccountNumber' onChange={handleChange} onBlur={handleError} />
//   //       </Field>
//   //       </Stack></Stack>
//   //     </div>
//   //     {/* <div className={`${styles.margin20} ${styles.edate}`}>
//   //       <Label>
//   //         Acknowledgements*:
//   //       </Label>
//   //       <Field validationMessage={errors && errors.primaryPhone}>
//   //         <Input id={inputId} type='text' onKeyDown={(e) => {
//   //           const isbackspace = e.key === 'Backspace';
//   //           const isNumber = /^[0-9]$/;
//   //           if (!isNumber.test(e.key) && !isbackspace) {
//   //             e.preventDefault();
//   //           }
//   //         }} value={formData.primaryPhone.toString()} name='primaryPhone' {...props} onChange={handleChange} onBlur={handleError} />
//   //       </Field>
//   //     </div> */}
//   //   </>)
//   // }
//   // const otherbank = () => {
//   //   return (<>
//   //     <h3>Please double-check youve entered the correct information before you submit the form to avoid delays.</h3>
//   //     <div style={{ backgroundColor: 'lightblue' }}>
//   //       <h2 style={{ color: 'red' }}>Overseas Transfer</h2>
//   //       <h1>Please be aware that this is an international transaction, where processing fees/bank charges of AU$30 apply, and the currency exchange rate may affect the amount you finally receive. </h1>
//   //       <h3>Do you have the right details?</h3>
//   //       <p>International fund transfers are processed as per the information/ details provided by you in this form; thus, please ensure all information is correct and updated. Winslow College accepts no liability for any delays, mistakes or omissions that may occur due to misinformation leading to the financial institutions failure to identify the payee.</p>
//   //       <h3>To avoid delays, please ensure that:</h3>
//   //       <ul>
//   //         <li>You have the correct recipient details</li>
//   //         <li>Your designated bank account can receive money from overseas</li>
//   //         <li>Your bank accepts either USD or AUD. Any difference in exchange rates will be your responsibility.</li>
//   //       </ul>
//   //       <p>An international transfer can take 1-2 weeks, depending on the bank and country.</p>
//   //       <h3>Please double-check you’ve entered the correct information before you submit the form to avoid any delays & extra administrative charges.</h3>
//   //       <p><span style={{ fontSize: '10px', fontWeight: 'bold' }}>Note:</span> In the case, the international money transfer does not get processed due to incorrect bank details, you will be notified, and you will be required to submit a new refund form with the correct details. The transfer fee will be charged again for the 2nd attempt, and the same will be deducted from the total refundable amount.</p>
//   //     </div>
//   //     <div>
//   //       {/* error baki */}
//   //       <select
//   //         name="course"
//   //         style={{ width: '100%', height: '32px' }}
//   //         value={formData.registration.course}
//   //         onChange={handleChange}
//   //       // onBlur={handleBlur}
//   //       >
//   //         <option value="">Select an option</option>
//   //         <option value="10-20">india</option>
//   //         <option value="20-30">USA</option>
//   //         <option value="30-40">UK</option>

//   //       </select>

//   //     </div>
//   //     <div>
//   //       <Label>
//   //         Please select the currency you want to receive your transfer*
//   //       </Label>
//   //       {/* <Input id={inputId} value={formData.organization} name='MorS' {...props} onChange={handleChange} onBlur={handleError} /> */}
//   //       <Field validationMessage={errors && errors.Currency}>
//   //         <RadioGroup layout="horizontal" >
//   //           <Radio value="USD" name='Currency' label="USD" onChange={handleChange
//   //           } />
//   //           <Radio value="AUD" name='Currency' label="AUD" onChange={handleChange} />
//   //         </RadioGroup>
//   //       </Field>
//   //     </div>
//   //     <div>
//   //       <h3>Please ensure your Bank accepts this currency.</h3>
//   //       <div>
//   //         <Label>
//   //           benificiary name:
//   //         </Label>
//   //         <Field validationMessage={errors && errors.BeneficiaryName}>
//   //           <Input id={inputId} type='text' value={formData.Other.BeneficiaryName} name='BeneficiaryName' onChange={handleChange} onBlur={handleError} />
//   //         </Field>
//   //       </div>
//   //       <div>
//   //         <Label>
//   //           benificiary address:
//   //         </Label>
//   //         <Field validationMessage={errors && errors.BeneficiaryAddress}>
//   //           <Input id={inputId} type='text' value={formData.Other.BeneficiaryAddress} name='BeneficiaryAddress' onChange={handleChange} onBlur={handleError} />
//   //         </Field>
//   //       </div>
//   //       <div>
//   //         <Label>
//   //           Bank name:
//   //         </Label>
//   //         <Field validationMessage={errors && errors.BankName}>
//   //           <Input id={inputId} type='text' value={formData.Other.BankName} name='BankName' onChange={handleChange} onBlur={handleError} />
//   //         </Field>
//   //       </div>
//   //       <div>
//   //         <Label>
//   //           Bank Address:
//   //         </Label>
//   //         <Field validationMessage={errors && errors.BankAddress}>
//   //           <Input id={inputId} type='text' value={formData.Other.BankAddress} name='BankAddress' onChange={handleChange} onBlur={handleError} />
//   //         </Field>
//   //       </div>
//   //       <div >
//   //         <Label>
//   //           Account Number:
//   //         </Label>
//   //         <Field validationMessage={errors && errors.AccountNumber}>
//   //           <Input id={inputId} type='text' onKeyDown={(e) => {
//   //             const isbackspace = e.key === 'Backspace';
//   //             const isNumber = /^[0-9]$/;
//   //             if (!isNumber.test(e.key) && !isbackspace) {
//   //               e.preventDefault();
//   //             }
//   //           }} value={formData.Other.AccountNumber.toString()} name='AccountNumber' onChange={handleChange} onBlur={handleError} />
//   //         </Field>
//   //       </div>
//   //       <div >
//   //         <Label>
//   //           IFSC Code:
//   //         </Label>
//   //         <Field validationMessage={errors && errors.IFSCCode}>
//   //           <Input id={inputId} type='text' onKeyDown={(e) => {
//   //             const isbackspace = e.key === 'Backspace';
//   //             const isNumber = /^[0-9]$/;
//   //             if (!isNumber.test(e.key) && !isbackspace) {
//   //               e.preventDefault();
//   //             }
//   //           }} value={formData.Other.IFSCCode.toString()} name='IFSCCode' onChange={handleChange} onBlur={handleError} />
//   //         </Field>
//   //       </div>
//   //       <div>
//   //         <Label>
//   //           Shift Code:
//   //         </Label>
//   //         <Field validationMessage={errors && errors.SwiftCode}>
//   //           <Input id={inputId} type='text' onKeyDown={(e) => {
//   //             const isbackspace = e.key === 'Backspace';
//   //             const isNumber = /^[0-9]$/;
//   //             if (!isNumber.test(e.key) && !isbackspace) {
//   //               e.preventDefault();
//   //             }
//   //           }} value={formData.Other.SwiftCode.toString()} name='SwiftCode' onChange={handleChange} onBlur={handleError} />
//   //         </Field>
//   //       </div>
//   //       <div>
//   //         <Label>
//   //           IBAN Number(if applicable):
//   //         </Label>
//   //         <Field validationMessage={errors && errors.IBANNumber}>
//   //           <Input id={inputId} type='text' onKeyDown={(e) => {
//   //             const isbackspace = e.key === 'Backspace';
//   //             const isNumber = /^[0-9]$/;
//   //             if (!isNumber.test(e.key) && !isbackspace) {
//   //               e.preventDefault();
//   //             }
//   //           }} value={formData.Other.IBANNumber.toString()} name='IBANNumber' onChange={handleChange} onBlur={handleError} />
//   //         </Field>
//   //       </div>
//   //       <p>Countries that require IBAN number for fund transfers</p>
//   //     </div>
//   //   </>)
//   // }


//   return (
//     <>

//       <Stack className={styles.BodyStack}>
//         <Stack className={styles.Form1}>
//           <Stack className={styles.Fourty}>


//             <div className={styles.images} />
//             <h3>
//               Online Refund Request Form
//             </h3>


//           </Stack>
//           <Stack className={styles.Sixty}>

//             <Stack className={styles.Demo}> <Label className={styles.head}><span style={{ fontSize: 24, color: 'white' }}>Student Detail</span></Label></Stack>

//             <form onSubmit={handlesubmit}>


//               <div>I request a refund for the following:</div>
//               <div>
//                 <Stack horizontal className={styles.Right} style={{ marginBottom: 10, }}><Label className={styles.lbl} required >Select Type Of Refund:</Label>       <Stack className={styles.txtfield} > <Field validationMessage={errors && errors.TypeOfRefund} >
//                   <RadioGroup layout="horizontal" className={styles.RadioWrap}>

//                     <Radio value="Withdrawal" name='TypeOfRefund' label="Withdrawal" onChange={handleChange} />

//                     <Radio value="Transfer" name='TypeOfRefund' label="Transfer" onChange={handleChange} />

//                     <Radio value="Cancellation" name='TypeOfRefund' label="Cancellation" onChange={handleChange} />

//                     <Radio value="Visa Refusal" name='TypeOfRefund' label="Visa Refusal" onChange={handleChange} />

//                     <Radio value="Other" name='TypeOfRefund' label="Other" onChange={handleChange} />

//                     {/* <Radio value="pear" name='MorS' label="Pear" onChange={handleChange} /> */}

//                   </RadioGroup>
//                 </Field>      </Stack> </Stack>

//                 {/* <Label>Select Type Of Refund:</Label>
//                 <Field validationMessage={errors && errors.TypeOfRefund}>

//                   <RadioGroup layout="horizontal">

//                     <Radio value="apple" name='MorS' label="Apple" onChange={handleChange} />

//                     <Radio value="pear" name='MorS' label="Pear" onChange={handleChange} />

//                     <Radio value="pear" name='MorS' label="Pear" onChange={handleChange} />

//                     <Radio value="pear" name='MorS' label="Pear" onChange={handleChange} />

//                     <Radio value="pear" name='MorS' label="Pear" onChange={handleChange} />

//                     <Radio value="pear" name='MorS' label="Pear" onChange={handleChange} />

//                   </RadioGroup>

//                 </Field> */}
//               </div>
//               <div>

//                 <Stack horizontal className={styles.Right} style={{ marginBottom: 10 }}><Label className={styles.lbl} required >Amount:</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.Amount}>
//                   <Input
//                     type="text"
//                     value={formData.registration2.Amount}
//                     name="Amount"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     onKeyDown={(e) => {
//                       const isbackspace = e.key === 'Backspace';
//                       const isNumber = /^[0-9]$/;
//                       if (!isNumber.test(e.key) && !isbackspace) {
//                         e.preventDefault();
//                       }
//                     }}
//                   />
//                 </Field>      </Stack> </Stack>
//                 {/* <Label>
//                   Amount:
//                 </Label>

//                 <Field validationMessage={errors && errors.Amount}>
//                   <Input
//                     type="text"
//                     value={formData.registration2.Amount}
//                     name="Amount"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     onKeyDown={(e) => {
//                       const isbackspace = e.key === 'Backspace';
//                       const isNumber = /^[0-9]$/;
//                       if (!isNumber.test(e.key) && !isbackspace) {
//                         e.preventDefault();
//                       }
//                     }}
//                   />
//                 </Field> */}
//               </div>

//               <Stack horizontal className={styles.Right} style={{ marginBottom: 10, alignItems: "center" }}><Label className={styles.lbl} required >Reason <br /><span>
//                 (Please Attach any support Documentation):
//               </span></Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.Reason}>
//                 <Input
//                   type="text"
//                   value={formData.registration2.Reason}
//                   name="Reason"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                 />
//               </Field>      </Stack> </Stack>
//               <div>
//                 <Stack horizontal className={styles.Right} style={{ marginBottom: 10 }}><Label className={styles.lbl} required >Upload image</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && UploadError}>
//                   <IconButton iconProps={{ iconName: 'Upload' }} style={{ width: "auto", backgroundColor: 'white', marginTop: "10px", border: "0.5px solid black", height: 90 }} onClick={() => {
//                     const res: any = document.querySelector('input[type="file"]')
//                     if (res) {
//                       res.click()
//                     }
//                   }} > <span>Upload Document</span></IconButton>

//                   <input type="file" id='Uploadfile' style={{ display: 'none' }} />
//                 </Field>      </Stack> </Stack>
//                 {/* {UploadError && <p style={{ color: 'red' }}>{UploadError}</p>}  */}

//                 {/* <IconButton iconProps={{ iconName: 'Upload' }} style={{ width: "auto", backgroundColor: 'white', marginTop: "10px", border: "1px solid black" }} onClick={() => {
//                   const res: any = document.querySelector('input[type="file"]')
//                   if (res) {
//                     res.click()
//                   }
//                 }} > <span>Upload Document</span></IconButton>

//                 <input type="file" id='Uploadfile' style={{ display: 'none' }} />
//                 {UploadError && <p style={{ color: 'red' }}>{UploadError}</p>} */}

//               </div>
//               {/* uploaad file control.. */}
//               {/* <h3>Refund Method - Please provide your account details or the account details of the nominated third party where you wish the refund amount to be received.*</h3> */}
//               <div >
//                 {/* <Input id={inputId} value={formData.organization} name='MorS' {...props} onChange={handleChange} onBlur={handleError} /> */}
//                 <Field validationMessage={errors && errors.TypeOfRefund}>
//                   <RadioGroup layout="horizontal">
//                     <Radio
//                       value="Onshore transfer(australian)"
//                       name="TypeOfRefund"
//                       label="Onshore transfer(Australian bank)"
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     <Radio
//                       value="AUD"
//                       name="TypeOfRefund"
//                       label="Overseas Transfer(Transfer fees applied)"
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                   </RadioGroup>
//                 </Field>
//               </div>

//               {selectedRefundType === "Onshore transfer(australian)" && (
//                 <>   <Stack className={styles.Sixty}>
//                   <div>


//                     <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Account Name</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.AccountName}>
//                       <Input
//                         type="text"
//                         value={formData.Australian.AccountName}
//                         name="AccountName"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                       />
//                     </Field>      </Stack> </Stack>
//                     {/* <Label>Account Name:</Label>
//                     <Field validationMessage={errors && errors.AccountName}>
//                       <Input
//                         type="text"
//                         value={formData.Australian.AccountName}
//                         name="AccountName"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                       />
//                     </Field> */}
//                   </div>

//                   <div>

//                     <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >BSB</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.BSB}>
//                       <Input
//                         type="text"
//                         value={formData.Australian.BSB}
//                         name="BSB"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         onKeyDown={(e) => {
//                           const isbackspace = e.key === 'Backspace';
//                           const isNumber = /^[0-9]$/;
//                           if (!isNumber.test(e.key) && !isbackspace) {
//                             e.preventDefault();
//                           }
//                         }}
//                       />
//                     </Field>      </Stack> </Stack>
//                     {/* <Label>BSB:</Label>
//                     <Field validationMessage={errors && errors.BSB}>
//                       <Input
//                         type="text"
//                         value={formData.Australian.BSB}
//                         name="BSB"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         onKeyDown={(e) => {
//                           const isbackspace = e.key === 'Backspace';
//                           const isNumber = /^[0-9]$/;
//                           if (!isNumber.test(e.key) && !isbackspace) {
//                             e.preventDefault();
//                           }
//                         }}
//                       />
//                     </Field> */}
//                   </div>

//                   <div>

//                     <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Account number</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.AccoundNumber}>
//                       <Input
//                         type="text"
//                         value={formData.Australian.AccoundNumber}
//                         name="AccoundNumber"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         onKeyDown={(e) => {
//                           const isbackspace = e.key === 'Backspace';
//                           const isNumber = /^[0-9]$/;
//                           if (!isNumber.test(e.key) && !isbackspace) {
//                             e.preventDefault();
//                           }
//                         }}
//                       />
//                     </Field>      </Stack> </Stack>


//                     {/* <Label>Account Number:</Label>
//                     <Field validationMessage={errors && errors.AccoundNumber}>
//                       <Input
//                         type="text"
//                         value={formData.Australian.AccoundNumber}
//                         name="AccoundNumber"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         onKeyDown={(e) => {
//                           const isbackspace = e.key === 'Backspace';
//                           const isNumber = /^[0-9]$/;
//                           if (!isNumber.test(e.key) && !isbackspace) {
//                             e.preventDefault();
//                           }
//                         }}
//                       />
//                     </Field> */}
//                   </div>



//                 </Stack> </>
//               )}

//               {selectedRefundType === "AUD" &&
//                 (
//                   <>


//                     <Stack className={styles.Sixty1}>
//                       <h3 style={{ fontWeight: 500 }}>

//                         Please double-check you’ve entered the correct information before you submit the form to avoid delays
//                       </h3>
//                       <div>

//                         <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Currency</Label>       <Stack className={styles.txtfield}><Field validationMessage={errors && errors.Currency}>
//                           <RadioGroup layout="horizontal" >
//                             <Radio value="USD" name='Currency' label="USD" onChange={handleChange
//                             } />
//                             <Radio value="AUD" name='Currency' label="AUD" onChange={handleChange} />
//                           </RadioGroup>
//                         </Field>      </Stack> </Stack>
//                         {/* <Label>Currency:</Label>
//                       <Field validationMessage={errors && errors.Currency}>
//                         <Input
//                           type="text"
//                           value={formData.Other.Currency}
//                           name="Currency"
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                         />
//                       </Field> */}
//                       </div>

//                       <div>

//                         <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Country</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.Country}>
//                           {/* <RadioGroup layout="horizontal">
//                     <Radio value="apple" name='course' label="Apple" onChange={handleChange
//                                     } />
//                     <Radio value="pear" name='course' label="Pear" onChange={handleChange} />
//                     </RadioGroup> */}
//                           <select
//                             name="Country"
//                             style={{ width: '100%', height: '32px' }}
//                             value={formData.Other.Country}
//                             onChange={handleChange}
//                           // onBlur={handleBlur}
//                           >
//                             <option value="">Select an option</option>
//                             <option value="India">India</option>
//                             <option value="USA">USA</option>
//                             <option value="UK">UK</option>

//                           </select>


//                         </Field>  </Stack> </Stack>
//                         {/* <Label>Country:</Label>
//                       <Field validationMessage={errors && errors.Country}>
//                         <Input
//                           type="text"
//                           value={formData.Other.Country}
//                           name="Country"
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                         />
//                       </Field> */}
//                       </div>
//                       <div>

//                         <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Beneficiary Name:</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.BeneficiaryName}>
//                           <Input
//                             type="text"
//                             value={formData.Other.BeneficiaryName}
//                             name="BeneficiaryName"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                           />
//                         </Field>      </Stack> </Stack>
//                         {/* <Label>Beneficiary Name:</Label>
//                       <Field validationMessage={errors && errors.BeneficiaryName}>
//                         <Input
//                           type="text"
//                           value={formData.Other.BeneficiaryName}
//                           name="BeneficiaryName"
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                         />
//                       </Field> */}
//                       </div>

//                       <div>

//                         <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Beneficiary Address</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.BeneficiaryAddress}>
//                           <Input
//                             type="text"
//                             value={formData.Other.BeneficiaryAddress}
//                             name="BeneficiaryAddress"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                           />
//                         </Field>      </Stack> </Stack>
//                         {/* <Label>Beneficiary Address:</Label>
//                       <Field validationMessage={errors && errors.BeneficiaryAddress}>
//                         <Input
//                           type="text"
//                           value={formData.Other.BeneficiaryAddress}
//                           name="BeneficiaryAddress"
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                         />
//                       </Field> */}
//                       </div>

//                       <div>
//                         <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Bank Name</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.BankName}>
//                           <Input
//                             type="text"
//                             value={formData.Other.BankName}
//                             name="BankName"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                           />
//                         </Field>      </Stack> </Stack>

//                         {/* <Label>Bank Name:</Label>
//                       <Field validationMessage={errors && errors.BankName}>
//                         <Input
//                           type="text"
//                           value={formData.Other.BankName}
//                           name="BankName"
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                         />
//                       </Field> */}
//                       </div>

//                       <div>
//                         <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Bank Address</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.BankAddress}>
//                           <Input
//                             type="text"
//                             value={formData.Other.BankAddress}
//                             name="BankAddress"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                           />
//                         </Field>      </Stack> </Stack>
//                         {/* <Label>Bank Address:</Label>
//                       <Field validationMessage={errors && errors.BankAddress}>
//                         <Input
//                           type="text"
//                           value={formData.Other.BankAddress}
//                           name="BankAddress"
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                         />
//                       </Field> */}
//                       </div>

//                       <div>

//                         <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Account Number</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.AccountNumber}>
//                           <Input
//                             type="text"
//                             value={formData.Other.AccountNumber}
//                             name="AccountNumber"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             onKeyDown={(e) => {
//                               const isbackspace = e.key === 'Backspace';
//                               const isNumber = /^[0-9]$/;
//                               if (!isNumber.test(e.key) && !isbackspace) {
//                                 e.preventDefault();
//                               }
//                             }}
//                           />
//                         </Field>      </Stack> </Stack>
//                         {/* <Label>Account Number:</Label>
//                       <Field validationMessage={errors && errors.AccountNumber}>
//                         <Input
//                           type="text"
//                           value={formData.Other.AccountNumber}
//                           name="AccountNumber"
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           onKeyDown={(e) => {
//                             const isbackspace = e.key === 'Backspace';
//                             const isNumber = /^[0-9]$/;
//                             if (!isNumber.test(e.key) && !isbackspace) {
//                               e.preventDefault();
//                             }
//                           }}
//                         />
//                       </Field> */}
//                       </div>

//                       <div>

//                         <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >IfSC code </Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.IFSCCode}>
//                           <Input
//                             type="text"
//                             value={formData.Other.IFSCCode}
//                             name="IFSCCode"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             onKeyDown={(e) => {
//                               const isbackspace = e.key === 'Backspace';
//                               const isNumber = /^[0-9]$/;
//                               if (!isNumber.test(e.key) && !isbackspace) {
//                                 e.preventDefault();
//                               }
//                             }}
//                           />
//                         </Field>      </Stack> </Stack>
//                         {/* <Label>IFSC Code:</Label>
//                       <Field validationMessage={errors && errors.IFSCCode}>
//                         <Input
//                           type="text"
//                           value={formData.Other.IFSCCode}
//                           name="IFSCCode"
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           onKeyDown={(e) => {
//                             const isbackspace = e.key === 'Backspace';
//                             const isNumber = /^[0-9]$/;
//                             if (!isNumber.test(e.key) && !isbackspace) {
//                               e.preventDefault();
//                             }
//                           }}
//                         />
//                       </Field> */}
//                       </div>

//                       <div>

//                         <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Swift Code</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.SwiftCode}>
//                           <Input
//                             type="text"
//                             value={formData.Other.SwiftCode}
//                             name="SwiftCode"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             onKeyDown={(e) => {
//                               const isbackspace = e.key === 'Backspace';
//                               const isNumber = /^[0-9]$/;
//                               if (!isNumber.test(e.key) && !isbackspace) {
//                                 e.preventDefault();
//                               }
//                             }}
//                           />
//                         </Field>      </Stack> </Stack>

//                         {/* <Label>Swift Code:</Label>
//                       <Field validationMessage={errors && errors.SwiftCode}>
//                         <Input
//                           type="text"
//                           value={formData.Other.SwiftCode}
//                           name="SwiftCode"
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           onKeyDown={(e) => {
//                             const isbackspace = e.key === 'Backspace';
//                             const isNumber = /^[0-9]$/;
//                             if (!isNumber.test(e.key) && !isbackspace) {
//                               e.preventDefault();
//                             }
//                           }}
//                         />
//                       </Field> */}
//                       </div>

//                       <div>

//                         <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >IBAN Number</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.IBANNumber}>
//                           <Input
//                             type="text"
//                             value={formData.Other.IBANNumber}
//                             name="IBANNumber"
//                             onChange={handleChange}
//                             onBlur={handleBlur}
//                             onKeyDown={(e) => {
//                               const isbackspace = e.key === 'Backspace';
//                               const isNumber = /^[0-9]$/;
//                               if (!isNumber.test(e.key) && !isbackspace) {
//                                 e.preventDefault();
//                               }
//                             }}
//                           />
//                         </Field>      </Stack> </Stack>

//                         {/* <Label>IBAN Number:</Label>
//                       <Field validationMessage={errors && errors.IBANNumber}>
//                         <Input
//                           type="text"
//                           value={formData.Other.IBANNumber}
//                           name="IBANNumber"
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           onKeyDown={(e) => {
//                             const isbackspace = e.key === 'Backspace';
//                             const isNumber = /^[0-9]$/;
//                             if (!isNumber.test(e.key) && !isbackspace) {
//                               e.preventDefault();
//                             }
//                           }}
//                         />
//                       </Field> */}
//                       </div>
//                     </Stack> </>
//                 )}

//               <div>
//                 <p style={{ marginTop: 20, fontWeight: 500 }}>Acknowledgement*</p>
//                 <div>      <Stack horizontal className={styles.Right}>
//                   <Field validationMessage={checkBoxError}>
//                     <Label className={styles.lbl} required >
//                       <Checkbox
//                         className={styles.checkboxspace}
//                         checked={option1}
//                         id='check 1'
//                         name="option 1"
//                         onChange={() => (setOption1(!option1))}

//                         label="'I understand that my request for a refund will be processed in/ accordance with the Fees, Charges & Refund Policy.'"
//                       />
//                       <Checkbox
//                         className={styles.checkboxspace}
//                         checked={option2}
//                         id='check 2'
//                         name="option 2"
//                         onChange={() => (setOption2(!option2))}
//                         label='I understand that Winslow College will not transfer any funds to a third party unless I explicitly request it in writing, in which case Winslow College shall be released of any responsibility in relation to the refund once the funds have been transferred as requested.'
//                       /> <Checkbox
//                         className={styles.checkboxspace}
//                         checked={option3}
//                         id='check 3'
//                         name="option 3"
//                         onChange={() => (setOption3(!option3))}
//                         label='Signing this form does not mean that it is approved, you need to wait for Winslow College`s approval communication'
//                       /></Label>  </Field>
//                   <Stack className={styles.txtfield}>
//                     .
//                   </Stack>
//                 </Stack>


//                 </div>

//                 <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Signature:</Label>       <Stack className={styles.txtfield}> <Field>
//                   <Signature errors={signerrors} setErrors={setsignerrors} onData={setSignData}/>
//                 </Field>      </Stack> </Stack>



//                 <Stack horizontal className={styles.Right} style={{ marginTop: 15 }}><Label className={styles.lbl} required >DATE:</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.Date}>
//                   <DatePicker
//                     allowTextInput
//                     placeholder="Select a date..."
//                     // className={styles.control}
//                     onSelectDate={(date) => _onDateChanged(date, "Date")}
//                   />
//                 </Field>      </Stack> </Stack>


//               </div>
//               <PrimaryButton type='Submit' >Submit</PrimaryButton>
//               <Stack className={styles.left}><PrimaryButton className={styles.btn} type='submit' text='Submit' style={{ border: 'outset 20px lightgreen', fontFamily: 'sans-serif', color: 'white', fontWeight: 20, fontSize: 18 }} /> </Stack>
//             </form>

//           </Stack>
//           {/* <Stack className={styles.left}><PrimaryButton className={styles.btn} onClick={handlesubmit} type='submit' text='Submit' style={{ border: 'outset 20px lightgreen', fontFamily: 'sans-serif', color: 'white', fontWeight: 20, fontSize: 18 }} /> </Stack> */}

//         </Stack>


//       </Stack>
//     </>
//   )
// }

// export default Refundform2