// const files = (document.getElementById('Uploadfile') as HTMLInputElement).files;
        
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
    
//             const url = `${context.pageContext.web.absoluteUrl}/_api/Web/Lists/getByTitle('${formData.registration.fullName}')/RootFolder/Files/Add(url='I_9.pdf',overwrite=true)`;
            
    
    
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