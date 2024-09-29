import React from 'react'
import { useState,useEffect } from 'react';
import {useForm} from 'react-hook-form'
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Loading Data",data);
        try{
            setLoading(true);
            const response = {status:"OK"};
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API,data);
            console.log("Logging response",response);
            setLoading(false);
        }
        catch(error){
            console.log("Error:", error.message);
            setLoading(false);
        }

    }

    useEffect (() => {
        if(isSubmitSuccessful) {
            reset({ 
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
            })
        }
        },[reset,isSubmitSuccessful]);
    
  return (
    <form onSubmit={handleSubmit(submitContactForm)} >
        <div className='flex flex-col gap-14'>
        <div className='flex gap-5'>
            {/* firstname  */}
        <div className='flex flex-col'>
            <label htmlform='firstname'>FirstName</label>
            <input 
            type='text'
            name='firstname'
            id='firstname'
            className='text-black'
            placeholder='Enter first name' {
                ...register("firstname", {required:true})}/>
                {
                    errors.firstname && (
                        <span>
                            Please enter Your name
                        </span>
                    )
                }
        </div>

        {/* lastname  */}
        <div className='flex flex-col'>
            <label htmlform='lastname'>lastName</label>
            <input 
            type='text'
            name='lastname'
            id='lastname'
            className='text-black'
            placeholder='Enter last name' {
                ...register("lastname")}/>
               
        </div>
        </div>

     {/* email  */}
        <div className='flex flex-col'>
            <label htmlform='email'>Email Address</label>
            <input 
            type='email'
            name='email'
            id='email'
            className='text-black'
            placeholder='Enter email Address' {
                ...register("email", {required:true})}/>
                {
                    errors.email && (
                        <span>
                            Please enter Your Email Address
                        </span>
                    )
                }
        </div>

        {/* phone no  */}
        <div className='flex flex-col gap-2'>
            <label htmlFor='phonenumber'>Phone Number</label>
            <div className='flex flex-row gap-5'>
                {/* dropdoown  */}
                <div className=' flex w-[15%] gap-5'>

                    <select name='dropdown'
                    id ="dropdown"
                    className='text-black'
                    {...register("countrycode",{required:true})}>
                        {
                            CountryCode.map((element, index) => {
                                return(
                                    <option key ={index} value={element.code}>{element.code} -{element.country}</option>
                                )
                            })
                        }

                    </select>

                </div>

                {/* <div className='w-[80%]'> */}
                    <input 
                    type='number'
                    name='phonenumber'
                    id='phonenumber'
                    placeholder='12345 67890'
                    className='text-black'
                    {
                        ...register("phoneNo",{
                            required:{value:true, message:"Please enter Phone Number"},
                            maxLength:{value:10, message:"Invalid Phone number"},
                            minLength:{value:0, message:"Invalid Phone number"}
                        })
                    }
                    />
                {/* </div> */}

            </div>
            {
                errors.phoneNo && (
                    <span>
                        {errors.phoneno.message}
                    </span>
                )
            }

        </div>

        {/* message  */}
        <div className='flex flex-col'> 
            <label htmlFor='message'>
                Message
            </label>
            <textarea 
            name='message'
            id='message'
            cols='30'
            rows='7'
            className='text-black'
            placeholder='Enter Your message here'{
                ...register("message",{required:true})
            }
            />
             {
                    errors.email && (
                        <span>
                            Please enter Your message
                        </span>
                    )
                }
        </div>

        <button type ='submit' className='rounded-md bg-yellow-50 px-6 text-center text-[20px] font-bold text-black'>
            Send Message
        </button>



        
        </div>
    </form>
    
  )
}

export default ContactUsForm