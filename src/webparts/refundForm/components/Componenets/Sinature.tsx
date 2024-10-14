/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as  React from 'react'
import styles from '../RefundForm.module.scss';
// import { PrimaryButton } from '@fluentui/react';
import { useRef } from 'react';
// import Refundform from './Componenets/Refundform'
import { Field } from '@fluentui/react-components';
// import { string } from 'yup';




const Signature = ({ errors, setErrors, onData }: { errors: any, setErrors: any, onData: (data: any) => void }) => {

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D | null>(null);
  const [signimage, setsignimage] = React.useState('')
  const containerRef = useRef<HTMLDivElement>(null);
  // const [errors, setErrors] = React.useState("");



  // React.useEffect(() => {
  //   if (canvasRef.current) {
  //     const canvasContext = canvasRef.current.getContext('2d');
  //     if (canvasContext) {
  //       canvasContext.strokeStyle = '#000000'; // Signature color
  //       canvasContext.lineWidth = 2; // Signature thickness
  //       setCtx(canvasContext);
  //     }
  //   }
  // }, []);





  // First attempt

  // const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (ctx) {
  //     setIsDrawing(true);
  //     ctx.beginPath();
  //     setErrors('')
  //     ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
  //   }
  // }

  // const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (isDrawing && ctx) {
  //     ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
  //     ctx.stroke();
  //   }
  // }
  //================================================
  // second attempt
  //================================================
  // const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
  //     if (ctx) {
  //       setIsDrawing(true);
  //       ctx.beginPath();
  //       setErrors('');

  //       const rect = canvasRef.current!.getBoundingClientRect();
  //       ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
  //   }
  // }

  // const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
  //   if (isDrawing && ctx) {
  //       const rect = canvasRef.current!.getBoundingClientRect();
  //       ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
  //       ctx.stroke();
  //   }
  // }
  //==================================================
  //  Third attempt
  //==================================================

  React.useEffect(() => {
    if (canvasRef.current) {
      // Set the canvas width and height to match the container size
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const canvasContext = canvas.getContext('2d');
      if (canvasContext) {
        canvasContext.strokeStyle = '#000000'; // Signature color
        canvasContext.lineWidth = 2; // Signature thickness
        setCtx(canvasContext);
      }
    }
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (ctx) {
      setIsDrawing(true);
      ctx.beginPath();
      setErrors('');

      const rect = canvasRef.current!.getBoundingClientRect();
      const scaleX = canvasRef.current!.width / rect.width;    // Scaling factor X
      const scaleY = canvasRef.current!.height / rect.height;  // Scaling factor Y

      ctx.moveTo((event.clientX - rect.left) * scaleX, (event.clientY - rect.top) * scaleY);
    }
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing && ctx) {
      const rect = canvasRef.current!.getBoundingClientRect();
      const scaleX = canvasRef.current!.width / rect.width;    // Scaling factor X
      const scaleY = canvasRef.current!.height / rect.height;  // Scaling factor Y

      ctx.lineTo((event.clientX - rect.left) * scaleX, (event.clientY - rect.top) * scaleY);
      ctx.stroke();

    }
  }




  const stopDrawing = () => {
    if (isDrawing && ctx) {
      setIsDrawing(false);
      ctx.closePath();
      setErrors('')
    }
  }

  const clearCanvas = () => {
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }

  const saveSignature = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL('image/png');
      console.log(dataURL.length);

      if (dataURL.length > 2002) {
        console.log(dataURL.length);
        setsignimage(dataURL);
        onData(dataURL);
      }
      else {
        setErrors("Please Sign here")
      }

      console.log('Signature Data URL:', dataURL);
      // You can upload the dataURL to SharePoint or save it as needed
    }
    console.log(signimage, "khali");

  }

  // const  handlecahnge = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
  //   e.preventDefault();
  //  if(e.currentTarget){
  //    setErrors('');
  //  }
  //  else{
  //   setErrors("Image is require")
  //  }
  // }
  console.log(signimage);



  return (
    <>
      <div className={styles.yourWebPart} ref={containerRef}>
        {/* <h2>Signature Pad</h2> */}

        <Field style={{ width: '-webkit-fill-available' }} validationMessage={errors && errors} >
          <canvas
            ref={canvasRef}
            // width={500}
            // height={200}
            // name='signature'
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className={styles.canvas}
            placeholder='Draw your signature'
          // onChange={() => handlecahnge}
          // onBlur={() => handleblur}

          />
        </Field>
        {/* <canvas
        ref={canvasRef}
        // width={500}
        // height={200}
        name='signature'
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className={styles.canvas}
        placeholder='Draw your signature'
        onChange={handleChange}
      /> */}

        {/* <img src={signimage} alt="" /> */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 30 }}>

          <a onClick={clearCanvas}>Clear</a>
          <a onClick={saveSignature}>Save</a>
        </div>
      </div>
    </>
  )
}

export default Signature