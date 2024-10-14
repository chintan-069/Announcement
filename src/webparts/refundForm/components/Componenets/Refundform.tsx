/* eslint-disable prefer-const */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { Field, Input, useId } from '@fluentui/react-components';
import { DatePicker, Label, PrimaryButton, Stack} from '@fluentui/react';
import { validateData, userSchema } from '../../../../Validation/ResgistrationSchema';
import { useFormContext } from '../../../../Context/Notes/NoteContext';
import styles from '../RefundForm.module.scss';
// import Signature from './Sinature';
// import { sp } from './pnpconfig';
// import { useFormContext } from '../../../context';
 
// jarurat nathi .. context ma use karie to.


export interface errorprops {
  fullName?: string,
  address?: string,
  studentId?: string;
  emailAddress?: string,
  primaryPhone?: string,
  dateOfBirth?: string,
  course?: string,
  courseStartDate?: string,
  transfer?:string
  TypeOfRefund?: string
  Amount?: string
  Reason?: string
  SuppportDocument?: string
  Acknowledgement?: string
  Signature?: string
  // Date?: string

  AccountName?: string
  BSB?: string
  AccountNumberA?: string
  Currency?: string
  Country?: string

  BeneficiaryName?: string
  BeneficiaryAddressNew?: string
  BankName?: string
  BankAddress?: string
  AccountNumber?: string
  IFSCCode?: string
  SwiftCode?: string
  IBANNumber?: string
}

const Refundform = ({ onNext,_sp }: { onNext: () => void,_sp: any }) => {


  const {formData, setFormData} =useFormContext()

  //  const [check, setcheck] = React.useState('')
  // const { context } = useFormContext();
  const inputId = useId("input");
  
 
  // context mathi data lavana
  
  const post = async () => {
    const a = await _sp.web.lists.getByTitle("tst").items.add({
      Title: "1",
      Firstname: "data.firstName",
    });
    console.log(a);
 
  }
  React.useEffect(() => {
    post().then(res => console.log(res)).catch(err => console.log(err))
  }, [])
 
  const [errors, setErrors] = React.useState<errorprops>({
  });
 
  const handleSubmit = async (e:any) => {
    // e.preventDefault();
    console.log("submit");
 console.log(formData.registration);
 
    await validateData(formData.registration).then((res:any) =>
       (res.success ? (console.log("success"),onNext()) : setErrors(res.data)))
                        .catch((err: React.SetStateAction<errorprops>) => setErrors(err))
    // await validateData(formData.registration).then((res) => console.log(res)
    // )
    // console.log(result);
    // (result === true ? postData(formData) : setErrors(result));
    //   await validateData(formData).then((res) => (res.success ? postData(res.data) : setErrors(res.data))
    // ).catch(err => setErrors(err))
    // setErrors(result);
  }
  // console.log(handleSubmit());
 
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // setInputValue(prevState => ({ ...prevState, [name]: value }));
    console.log(name, value);
 
    setFormData(prevState => ({
      ...prevState,
      registration: {
        ...prevState.registration,
        [name]: value
      }
    }));

    // setcheck(e.target.value)
    setErrors(prevError => ({ ...prevError, [name]: '' })); // Clear error for the current field
 
  };
    const _onDateChanged = (date: Date | null | undefined, text: string) => {
      // if(date){
      //   setErrors({"Date" : ""});
      // }
      setFormData(prevState => ({
          ...prevState,
          // ...prevState.eventPlanning,  //cnotext state..
          registration: {
              ...prevState.registration,
              [text]: date
          }
      }));
  }
  
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


  
    const handleError = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      // console.log(name, value);
      try {
  
        await userSchema.validateAt(name, { [name]: value }, { strict: true })
  
        setErrors((previousError) => ({ ...previousError, [name]: undefined }))
  
      } catch (error) {
        // console.log(error);
        setErrors(previouError => ({ ...previouError, [name]: error.errors[0] }))
  
      }
      // setErrors({...errors, [name] : })
    }
  // for get items.
  // const get = async () => {
  //   const items: any[] = await _sp.web.lists.getByTitle("Attendees_List").items();
  //   console.log(items);
  //   // setResult(items);
  //   // return items;
 
  // }
  // const getlibrry = async () => {
  //   // const libraryName = 'coll';
  //   // const folderPath = 'mit1';
  //   console.log(_sp);
 
  //   // try {
  //   //   const files = await props._sp.web.getFolderByServerRelativePath(`/${libraryName}/${folderPath}`).files.get();
  //   //   files.forEach((file: { Name: any; ServerRelativeUrl: any }) => {
  //   //     console.log('File name:', file.Name);
  //   //     console.log('File URL:', file.ServerRelativeUrl);
  //   //   });
  //   // } catch (err) {
  //   //   console.log(err, "catch err");
  //   // }
 
  //   // for uploading
  //   // try {
  //   //   // Create the folder if it doesn't exist
  //   //   // await sp.web.folders.addUsingPath(`/${libraryName}/${folderPath}`);
 
  //   //   // Upload the file
  //   //   const response = await sp.web.getFolderByServerRelativePath(`/${libraryName}/${folderPath}`)
  //   //     .files.addUsingPath(file.name, file, { Overwrite: true });
 
  //   //   console.log('File uploaded successfully', response);
  //   // } catch (error) {
  //   //   console.error('Error uploading file:', error);
  //   // }
  //   // eslint-disable-next-line no-void
  //   void _sp.web.lists.add(`${libraryName} + ${new Date().getTime()}`, '', 101)
  //     .then((_result: any) => {
  //       console.log(`Library created with name: ${libraryName}`);
  //     });
 
  // }
  // React.useEffect(() => {
  //   getlibrry().catch((er: any) => console.log(er)
  //   );
  // }, []);

 
//   function submitForm(e:any) {
//     // const form = document.getElementById('myForm');
//     // let checkboxes: HTMLInputElement[] = [];
//     // const nodeList = document.querySelectorAll('input[type="checkbox"]');
 
//     console.log(check);
    
     
//     // for (let i = 0; i < nodeList.length; i++) {
//     //     checkboxes.push(nodeList[i] as HTMLInputElement);
//     // }

//     // if (checkboxes.length !== 2) {
//     //     alert('Please select exactly two checkboxes.');
//     // }
// }


 

  return (
    <>

        <>
   
      <Stack className={styles.BodyStack}>
         <Stack className={styles.Form}>
           <Stack className={styles.Fourty}>

             <div className={styles.images}></div>
             <h3>
               Online Refund Request Form
             </h3>


           </Stack>
           <Stack className={styles.Sixty}>
 
             <Stack className={styles.Demo}> <Label className={styles.head}><span style={{fontSize:24,color:'white'}}>Student Detail</span></Label></Stack>

             <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >FullName</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.fullName}>
              <Input id={inputId} type='text' value={formData.registration.fullName} name='fullName'  onChange={handleChange} onBlur={handleError} onKeyDown={(e) => {
              const isbackspace = e.key === 'Backspace';
              const isSpace = e.key === ' ';
              const isNumber = /^[A-Za-z]$/;
              if (!isNumber.test(e.key) && !isbackspace && !isSpace) {
                e.preventDefault();
              }
            }}/>
              
              </Field>      </Stack> </Stack>
    
                {/* use address controll */}

                <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Address</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.address}>
              <Input id={inputId} type='text' value={formData.registration.address} name='address' onChange={handleChange} onBlur={handleError} />
              </Field>   </Stack> </Stack>


        
        <Stack horizontal className={styles.Right}><Label className={styles.lbl} required > Student ID:</Label>       <Stack className={styles.txtfield}>  <Field validationMessage={errors && errors.studentId}>
                      <Input id={inputId} type='text' onKeyDown={(e) => {
                                      const isbackspace = e.key === 'Backspace';
                                      const isSpace = e.key === ' ';
                                      const isNumber = /^[0-9]$/;
                                      if (!isNumber.test(e.key) && !isbackspace && !isSpace) {
                                        e.preventDefault();
                                      }
                                    }} value={formData.registration.studentId.toString()} name='studentId'  onChange={handleChange} onBlur={handleError} />
                        </Field> </Stack> </Stack>
              
                 <Stack horizontal className={styles.Right}><Label className={styles.lbl} required > EMAIL ADDRESS:</Label>       <Stack className={styles.txtfield}>    <Field validationMessage={errors && errors.emailAddress}>
                    <Input id={inputId} type='text' value={formData.registration.emailAddress} name='emailAddress'  onChange={handleChange} onBlur={handleError} />
                    </Field></Stack> </Stack>
              

                 
                 <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >   PRIMARY PHONE:</Label>       <Stack className={styles.txtfield}>    <Field validationMessage={errors && errors.primaryPhone}>
                <Input id={inputId} type='text' onKeyDown={(e) => {
                                const isbackspace = e.key === 'Backspace';
                                const isSpace = e.key === ' ';
                                const isNumber = /^[0-9]$/;
                                if (!isNumber.test(e.key) && !isbackspace && !isSpace) {
                                  e.preventDefault();
                                }
                              }} value={formData.registration.primaryPhone.toString()} name='primaryPhone'  onChange={handleChange} onBlur={handleError} />
                </Field></Stack> </Stack>
               
            <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >  DATE OF BIRTH:</Label>       <Stack className={styles.txtfield}>    <Field validationMessage={errors && errors.dateOfBirth}>
                <DatePicker
                                allowTextInput
                                placeholder="Select a date..."
                                // className={styles.control}
                                onSelectDate={(date) => _onDateChanged(date, "dateOfBirth")}
                              />
                </Field></Stack> </Stack>
              
                  {/* // RADIO BUTTON */}


                  <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Course:</Label>       <Stack className={styles.txtfield}>    <Field validationMessage={errors && errors.course}>
                    {/* <RadioGroup layout="horizontal">
                    <Radio value="apple" name='course' label="Apple" onChange={handleChange
                                    } />
                    <Radio value="pear" name='course' label="Pear" onChange={handleChange} />
                    </RadioGroup> */}
                    <select
                            name="course"
                            style={{ width: '100%',height: '32px' }}
                            value={formData.registration.course}
                            onChange={handleChange}
                          // onBlur={handleBlur}
                          >
                            <option value="">Select an option</option>
                            <option value="BSB50420 - Diploma of Leadership and Management">BSB50420 - Diploma of Leadership and Management</option>
                            <option value="BSB60420 - Advanced Diploma of Leadership and Management BSB80320 - Graduate Diploma of Strategic Leadership">BSB60420 - Advanced Diploma of Leadership and Management BSB80320 - Graduate Diploma of Strategic Leadership   </option>
                            <option value="SIT30821 Certificate III in Commercial Cookery">SIT30821 Certificate III in Commercial Cookery</option>
                            <option value="SIT40521 - Certificate IV in Kitchen Management">SIT40521 - Certificate IV in Kitchen Management</option>
                            <option value="SIT50422 - Diploma of Hospitalit Management">SIT50422 - Diploma of Hospitality Management</option>
                           
                          </select>

                  
                    </Field></Stack> </Stack>
            


                {/* date controll use */}

                <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >  Course Start Date:</Label>       <Stack className={styles.txtfield}>    <Field validationMessage={errors && errors.courseStartDate}>
                <DatePicker
                                allowTextInput
                                placeholder="Select a date..."
                                // className={styles.control}
                                onSelectDate={(date) => _onDateChanged(date, "courseStartDate")}
                              />
                </Field></Stack> </Stack>
         
  
              
        {/* <PrimaryButton onClick={handleSubmit}>next</PrimaryButton> */}

             {/* <Stack horizontal className={styles.Right} style={{ marginTop: 15 }}><Label className={styles.lbl} required >DATE:</Label>       <Stack className={styles.txtfield}> <Field validationMessage={errors && errors.Date}>
                  <DatePicker
                    allowTextInput
                    placeholder="Select a date..."
                    // className={styles.control}
                    onSelectDate={(date) => _onDateChanged(date, "Date")}
                  />
                </Field>      </Stack> </Stack> */}

                {/* <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Date:</Label>       <Stack className={styles.txtfield}>    <Field validationMessage={errors && errors.Date}>
                <DatePicker
                                allowTextInput
                                placeholder="Select a date..."
                                // className={styles.control}
                                onSelectDate={(date) => _onDateChanged(date, "Date")}
                              />
                </Field></Stack> </Stack> */}

             </Stack>
             <Stack className={styles.left}><PrimaryButton className={styles.btn} onClick={handleSubmit} type='submit' text='Submit'  style={{border: 'outset 20px lightgreen',fontFamily:'sans-serif',color:'white',fontWeight:20,fontSize:18}}/> </Stack>
            
            {/* <PrimaryButton type="button" onClick={submitForm} name='submit'></PrimaryButton> */}
         </Stack>
        
        
         </Stack>  
        </>
        </>
  );
}
 
export default Refundform;































// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react/self-closing-comp */
// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// import * as  React from 'react'
// import styles from '../RefundForm.module.scss'
// import { DatePicker, Label, PrimaryButton, Stack, TextField} from '@fluentui/react'
// import Signature from './Sinature';
// import { useFormContext } from '../../../../Context/Notes/NoteContext';
// // import Signature from './Sinature';
// // import { validationSchema } from '../../../Library';



// const Refundform = () => {

//   const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
//    const { formData, setFormData}= useFormContext()

//   // const [inputValue, setinputValue] = useState<IInputFeild>({
//   //   FullName: '',
//   //   StudentId: '',
//   //   DateOfBirth:'',
//   //   Email:'',
//   //   PhoneNumber:'',
//   //   Address:'',
//   //   Course:'',
//   //   CourseDate:'',
//   //   error:{}

//   // })

//   const HandleChange =(e:  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>  ) =>{

//       const {name,value}= e.target

//       setFormData((prev: any) => ({
//         ...prev,
//       registration: {
//         ...prev.registration,
//         [name]: value
//       }
//       }))
//     }

    





//     const HandleSubmit = () =>{
//       console.log();
      
//     }

//   return (
//     <>
//       <Stack className={styles.BodyStack}>
//         <Stack className={styles.Form}>
//           <Stack className={styles.Fourty}>

//             <div className={styles.images}></div>
//             <h3>
//               Online Refund Request Form
//             </h3>


//           </Stack>
//           <Stack className={styles.Sixty}>
 
//             <Stack className={styles.Demo}> <Label className={styles.head}><span style={{fontSize:24,color:'white'}}>Student Detail</span></Label></Stack>
//             <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >First Name</Label>       <Stack className={styles.txtfield}> 
              
//               <TextField onChange={HandleChange} value ={formData.registration.FullName} name="FullName"  errorMessage={formData.error.FullName}/>       
              
//                 </Stack> </Stack>
//             <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Student ID</Label>       <Stack className={styles.txtfield}> 
              
//               <TextField onChange={HandleChange} value ={formData.registration.StudentId} name="StudentId"  errorMessage={formData.error.StudentId}/>    
              
//                 </Stack> </Stack>
//             <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Date of Birth</Label>    <Stack className={styles.txtfield}> 
              
//               <TextField onChange={HandleChange} value ={formData.registration.DateOfBirth} name="DateOfBirth"  errorMessage={formData.error.DateOfBirth}
              
//               /></Stack></Stack>
//             <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Email </Label>           <Stack className={styles.txtfield}> 
              
//               <TextField onChange={HandleChange} value ={formData.registration.Email} name="Email" errorMessage={formData.error.Email} />                
              
//                </Stack></Stack>
//             <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Phone Number</Label>     <Stack className={styles.txtfield}> 
              
//               <TextField onChange={HandleChange} value ={formData.registration.PhoneNumber} name="PhoneNumber"  errorMessage={formData.error.PhoneNumber}
              
//               /></Stack> </Stack>
//             <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Address</Label>          <Stack className={styles.txtfield}> 
              
//               <TextField onChange={HandleChange} value ={formData.registration.Address} name="Address"  errorMessage={formData.error.Address}/>          
              
//                 </Stack> </Stack>
//             <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Course</Label>           <Stack className={styles.txtfield}> 
              
//               <TextField onChange={HandleChange} value ={formData.registration.Course} name="Course"  errorMessage={formData.error.Course}/>             
              
//                 </Stack></Stack>
//             <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Course Start Date</Label><Stack className={styles.txtfield}> 
              
//               <TextField onChange={HandleChange} value ={formData.registration.CourseDate} name="CourseDate" errorMessage={formData.error.CourseDate} /> 
              
//                 </Stack></Stack>
//             <Stack horizontal className={styles.Right}> <Label className={styles.lbl} required >Signature Pad</Label>  <Stack className={styles.txtfield}><Signature />  </Stack></Stack>
//             </Stack>
//             <Stack className={styles.left}><PrimaryButton className={styles.btn} text='Submit' onClick={HandleSubmit} style={{border: 'outset 20px lightgreen',fontFamily:'sans-serif',color:'white',fontWeight:20,fontSize:18}}/> </Stack>
            
//         </Stack>
//         <DatePicker value={selectedDate} onSelectDate={(date: Date | null | undefined) => setSelectedDate(date  || undefined)}   />


//       </Stack>  


//     </>
//   )
// }

// export default Refundform


// // <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >First Name</Label>       <Stack className={styles.txtfield}> <TextField onChange={HandleChange} value ={inputValue.FullName} name="FullName"  errorMessage={inputValue.error.FullName}/>         </Stack> </Stack>
// // <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Student ID</Label>       <Stack className={styles.txtfield}> <TextField onChange={HandleChange} value ={inputValue.StudentId} name="StudentId"  errorMessage={inputValue.error.StudentId}/>      </Stack> </Stack>
// // <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Date of Birth</Label>    <Stack className={styles.txtfield}> <TextField onChange={HandleChange} value ={inputValue.DateOfBirth} name="DateOfBirth"  errorMessage={inputValue.error.DateOfBirth}/></Stack></Stack>
// // <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Email </Label>           <Stack className={styles.txtfield}> <TextField onChange={HandleChange} value ={inputValue.Email} name="Email" errorMessage={inputValue.error.Email} />                 </Stack></Stack>
// // <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Phone Number</Label>     <Stack className={styles.txtfield}> <TextField onChange={HandleChange} value ={inputValue.PhoneNumber} name="PhoneNumber"  errorMessage={inputValue.error.PhoneNumber}/></Stack> </Stack>
// // <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Address</Label>          <Stack className={styles.txtfield}> <TextField onChange={HandleChange} value ={inputValue.Address} name="Address"  errorMessage={inputValue.error.Address}/>            </Stack> </Stack>
// // <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Course</Label>           <Stack className={styles.txtfield}> <TextField onChange={HandleChange} value ={inputValue.Course} name="Course"  errorMessage={inputValue.error.Course}/>               </Stack></Stack>
// // <Stack horizontal className={styles.Right}><Label className={styles.lbl} required >Course Start Date</Label><Stack className={styles.txtfield}> <TextField onChange={HandleChange} value ={inputValue.CourseDate} name="CourseDate" errorMessage={inputValue.error.CourseDate} />   </Stack></Stack>