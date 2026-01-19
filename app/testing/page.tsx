"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase'; // Adjust path based on your file structure

export default function ConnectionTest() {
    const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function checkConnection() {
            try {
                // We attempt to fetch one row from any table, or just check the auth session
                const { data, error } = await supabase.from('streamrecords').select('*').limit(1);

                if (error) {
                    throw error;
                }
                setStatus('success');
            } catch (err: any) {
                console.error("Supabase connection error:", err.message);
                setErrorMessage(err.message);
                setStatus('error');
            }
        }

        checkConnection();
    }, []);

    return (
        <div className="p-4 rounded-md border">
            {status === 'testing' && <p className="text-yellow-500">Connecting to Supabase...</p>}
            {status === 'success' && <p className="text-green-500">✅ Connected Successfully!</p>}
            {status === 'error' && (
                <div className="text-red-500">
                    <p>❌ Connection Failed</p>
                    <p className="text-xs">{errorMessage}</p>
                </div>
            )}
        </div>
    );
}