"use client";
import React, { useEffect, useState } from 'react'
import { useFormStore } from '../store/form-store.store'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Edu } from "./Edu"


function Summary() {
    const { getForm } = useFormStore();
    const edu = getForm('edu');
    const [input, setInput] = useState('');
    const [summary, setSummary] = useState<Partial<Edu> | null>(null);

    // Sync input state with form field 'degree'
    useEffect(() => {
        const subscription = edu?.watch((value, { name }) => {
            if (name === "firstName") {
                setInput(value.firstName || "");
            }
        });
        return () => subscription?.unsubscribe(); // Cleanup on unmount
    }, [edu]);

    const handleClick = async () => {
        const data = await edu?.trigger();
        if (data) {
            setSummary(edu?.getValues());
        }
    }
    const resetWithDefault = () => {
        edu?.reset({
            firstName: 'jhon',
            lastName: 'doe'
        })
    }
    return (
        <Card>
            <CardContent>
                <Label>Field is Bi-directional Sync with FirstName, Try typing...</Label>
                <Input value={input} className='mb-4' onChange={(e) => edu?.setValue('firstName', e.target.value)} />
                <Button className='mx-4' onClick={resetWithDefault}>Reset With Default Value</Button>
                <Button onClick={handleClick}>Generate Summary</Button>
            </CardContent>
            <div className='p-10'>
                {summary && <Card>
                    <CardContent>
                        {
                            Object.entries(summary).map(([key, val]) => {
                                // Check if the value is an object (e.g., address)
                                if (typeof val === "object" && val !== null) {
                                    return (
                                        <div key={`div-${key}`} className="grid grid-cols-12 gap-4 border-t-2 w-full border-amber-100 p-4">
                                            <h1 className="col-span-12 rounded-md bg-amber-100 text-blue-600 text-center ">{key.toUpperCase()}</h1>
                                            <div className="col-span-10 space-y-2 ml-8">
                                                {Object.entries(val).map(([subKey, subVal]) => (
                                                    <div key={`div-${key}-${subKey}`} className="grid grid-cols-12 gap-4">
                                                        <span className="col-span-3 ">{subKey.toUpperCase()}</span>
                                                        <span className="col-span-9">{subVal !== null && subVal !== undefined ? String(subVal) : "N/A"}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }

                                // Handle non-object values (firstName, lastName)
                                return (
                                    <div key={`div-${key}`} className="grid grid-cols-12 gap-4 px-5 py-2">
                                        <span className="col-span-3 text-blue-400">{key.toUpperCase()}</span>
                                        <span className="col-span-9">{val !== null && val !== undefined ? String(val) : "N/A"}</span>
                                    </div>
                                );
                            })}
                    </CardContent>
                </Card>}
            </div>
        </Card>
    )
}

export default Summary