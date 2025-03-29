"use client";
import React, { useEffect, useState } from 'react'
import { useFormStore } from '../store/form-store.store'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Edu } from "./Edu"
import RenderSummary from './renderSummary';


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
                        <RenderSummary data={summary} level={0}/>
                    </CardContent>
                </Card>}
            </div>
        </Card>
    )
}

export default Summary