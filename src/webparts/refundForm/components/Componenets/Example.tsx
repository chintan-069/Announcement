// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// import * as React from 'react'

// const Example = () => {



//         const [imageData, setImageData] = React.useState<string | ArrayBuffer | null>(null);

//         const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//           const file = e.target.files ? e.target.files[0] : null;

//           if (file) {
//             const reader = new FileReader();

//             // Read file as Data URL
//             reader.onload = () => {
//               setImageData(reader.result); // Save image data (base64 URL)
//               console.log(reader.result); // Log the base64 image data
//             };

//             reader.readAsDataURL(file); // Converts image to base64
//           }
//         };




//     return (
//     <>

//     <div>Example</div>
//     <h3>Image Upload</h3>
//       <input type="file" accept="image/*" onChange={handleImageChange} />

//       {imageData && (
//         <div>
//           <h4>Preview:</h4>
//           <img src={imageData as string} alt="Uploaded" style={{ maxWidth: '300px' }} />
//         </div>
//       )}

//     </>
//   )
// }

// export default Example




/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { useState } from 'react';
import Signature from './Sinature';

const Example = (props: any) => {
    const [signData, setSignData] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [file, setFile] = useState<string | null | ArrayBuffer | any>(null);
    // const [filename, setfilename] = useState<any>('');

    const handleSignatureData = (data: string) => {
        setSignData(data);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {


        const file = e.target.files ? e.target.files[0] : null;
        // setfilename(file)

        if (file) {
            const reader = new FileReader();

            // Read file as Data URL
            reader.onload = () => {
                setFile(reader.result); // Save image data (base64 URL)
                console.log(reader.result); // Log the base64 image data
            };

            reader.readAsDataURL(file); // Converts image to base64
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!signData) {
            setUploadError("Please save your signature.");
            return;
        }

        if (!file) {
            setUploadError("Please select a file to upload.");
            return;
        }

        setUploadError(null);

        // const formData = new FormData();
        // formData.append("signature", signData);
        // formData.append("file", file);
        // const fileNamePng = ((filename.name+'').split('.')[0]).concat('.png');
        const formData = { "signature": signData.replace('data:image/png;base64,', ''), "file": file.replace('data:image/png;base64,', ''), "fullname": "subham" };
        console.log();

        console.log(formData);

        try {
            // Make a request to Power Automate Flow
            const response = await fetch("https://prod-10.centralindia.logic.azure.com:443/workflows/950774846cb84ef4997d78ee5241dacf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uKJJfTprqqACxtQxzy2zuP7y8eY3y_oWKIZFVnRB6zg",
                {
                    method: "POST",
                    headers: {
                        // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                        // You don't need to set Content-Type for FormData; the browser will do that automatically.
                        'Content-Type': 'application/json'
                    },
                    // contentType: 'application/json',
                    body: JSON.stringify(formData)
                });

            if (response.ok) {
                alert("Files uploaded successfully!");
            } else {
                console.error("Error uploading files:", response.statusText);
                setUploadError("File upload failed.");
            }
        } catch (error) {
            console.error("Error:", error);
            setUploadError("File upload failed. Check console for details.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Signature errors={uploadError} setErrors={setUploadError} onData={handleSignatureData} />
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>
            {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
        </div>
    );
};

export default Example;
