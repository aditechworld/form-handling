"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormField, FormLabel, FormMessage, FormControl, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldValue, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useFormStore } from '../store/form-store.store';
import { isValid } from 'zod';

export interface Edu {
    firstName: string;
    lastName:string;
    address: {
        street: string;
        city:string;
        state:string;
        country:string;
        pincode: number;
    }
}
function Edu() {
    const form = useForm<Edu>({
        defaultValues: {
            firstName: "",
            lastName:'',
            address: {
                street: '',
                city:'',
                state:'',
                country:'',
                pincode: 0
            }
        }
    });
    const register = useFormStore(state => state.registerForm);
    const unregister = useFormStore(state => state.unregisterForm);

    useEffect(() => {
        register("edu", form);
        return () => {
            unregister("edu");
        }
    }, [form, register, unregister]);

    const handleSubmit = (data: any) => {
        console.log(data)
    }
    return (
        <Card>
            <CardHeader><h2>Student Details{form.formState.isValid?'✔️':'✖️'}</h2></CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <div className='grid grid-cols-2 gap-3'>
                        <FormField
                            name="firstName"
                            control={form.control}
                            rules={{ required: "first name is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="lastName"
                            control={form.control}
                            rules={{ required: "Enter a Value, it a required field" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>
                        <div className='grid grid-cols-4 gap-3 mt-2'>
                            <FormField
                                name="address.street"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your skills" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="address.city"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your rating" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="address.state"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your state" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="address.country"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your country" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="address.pincode"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pincode</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Pincode" {...field} type='number' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>

            </CardContent>
        </Card>
    )
}

export default Edu