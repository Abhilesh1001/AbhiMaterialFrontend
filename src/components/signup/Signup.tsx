
'use client'
import PrBurron from '../button/PrBurron'
import TextInputText from '../dummyinput/TextInputText'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {useMutation} from '@tanstack/react-query'
import axios from 'axios';
import {useSelector} from 'react-redux'
import {StateProps} from '@/type/type'
import Loading from '../loading/Loading';

const Signup = () => {


    const {baseurl} = useSelector((state:StateProps)=>state.counter)
    const mutation = useMutation<any,any,any,any>({
        mutationFn: async (data)=>{
            return await axios.post(`${baseurl}cus/authreg/`,data)
        },
        onSuccess :()=>{
            formik.resetForm();
        }
    })
    // console.log(mutation.data,mutation?.error?.response?.data?.errors?.email[0],mutation.error)
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        name: Yup.string().required('Name is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        password2: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
        tc: Yup.boolean().oneOf([true], 'You must agree to the terms'),
    });

    console.log(mutation.error)
    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            password2: '',
            tc: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            const data = {
                email : values.email,
                name :values.name,
                password :values.password,
                tc : values.tc
            }
            // Add your form submission logic here
            mutation.mutate(values)
        },
    });


    return (
        <div className='mt-10'>
            <form onSubmit={formik.handleSubmit}>
                {mutation.isPending && <Loading />}
                {mutation?.isSuccess && <div>{mutation.data.data.msg}</div>}
                {mutation?.error?.response?.data?.errors?.email[0]}
                <TextInputText label={'Email'} type={'email'} name="email" value={formik.values.email} onChange={formik.handleChange} />
                {formik.errors.email}
                <TextInputText label={'Name'} name="name" value={formik.values.name} onChange={formik.handleChange} />
                {formik.errors.name}
                <TextInputText label={'Password'} type={'password'} name="password" value={formik.values.password} onChange={formik.handleChange} />
                {formik.errors.password}
                <TextInputText label={'Confirm Password'} type={'password'} name="password2" value={formik.values.password2} onChange={formik.handleChange} />
                {formik.errors.password2}
               <div className='flex items-center'>
               <input type="checkbox" className="rounded-md dark:bg-slate-600 p-2 items-center"
                checked={formik.values.tc} onChange={formik.handleChange} name="tc" />
                <div className="form-label">Do you Agree</div>
               </div>
                <PrBurron label={'Submit'} buttomType={'submit'} />
            </form>
        </div>
    )
}

export default Signup



