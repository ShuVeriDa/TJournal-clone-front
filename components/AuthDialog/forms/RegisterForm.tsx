import React, {FC, useState} from 'react';
import {Button} from "@material-ui/core";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {RegisterFormSchema} from '../../../utils/validations';
import {FormField} from "../../FormField";
import {UserAPI} from "../../../utils/api/tjournal-api";
import {CreateUserDto} from "../../../utils/api/types";
import {setCookie} from "nookies";
import {Alert} from "@material-ui/lab";

interface RegisterFormPropsType {
   onOpenRegister: () => void
   onOpenLogin: () => void
}

export const RegisterForm: FC<RegisterFormPropsType> = ({onOpenRegister, onOpenLogin}) => {
   const [errorMessage, setErrorMessage] = useState('')
   const form = useForm({
      mode: 'onChange',
      resolver: yupResolver(RegisterFormSchema)
   })

   const onSubmit = async (dto: CreateUserDto) => {
      try {
         const data = await UserAPI.register(dto)
         console.log(data)
         setCookie(null, "authToken", data.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
         })
         setErrorMessage('')
      } catch (err) {
         console.warn("Authorization error", err)
         if (err.response) {
            setErrorMessage(err.response.data.message)
         }
      }
   };


   return (
      <div>
         <FormProvider {...form}>
            <FormField name={'fullName'} label={'Имя и Фамилия'}/>
            <FormField name={'email'} label={"Почта"}/>
            <FormField name={'password'} label={'Пароль'}/>
            {errorMessage && <Alert severity='error' className="mb-10">{errorMessage}</Alert>}
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="d-flex align-center justify-between">
                  <Button disabled={!form.formState.isValid || form.formState.isSubmitting} onClick={onOpenRegister}
                          type="submit" color="primary" variant="contained">
                     Зарегистрироваться
                  </Button>
                  <Button onClick={onOpenLogin} color="primary" variant="text">
                     Войти
                  </Button>
               </div>
            </form>
         </FormProvider>
      </div>
   );
};
