import React, { useContext } from 'react';
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";
import { CiDollar } from "react-icons/ci";
import { FetchApiContext } from '@/contexts/FetchApi';

const Total = () => {
    const { data } = useContext(FetchApiContext);

    const incomes = data.filter((item) => item.type === 1).reduce((acc, item) => acc + item.value, 0);
    const expenses = data.filter((item) => item.type === 2).reduce((acc, item) => acc + item.value, 0);
    const total = incomes - expenses;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    return (
        <section className='container w-full mt-8 flex items-center justify-center gap-8'>
            <div className='p-8 rounded-md border w-96'>
                <span className='flex items-center justify-between'>
                    <h2>Incomes</h2>
                    <IoArrowUpCircleOutline color="#33cc95" size={32} />
                </span>
                <h1 className='text-bold text-4xl'>{formatCurrency(incomes)}</h1>
            </div>

            <div className='p-8 rounded-md border w-96'>
                <span className='flex items-center justify-between'>
                    <h2>Expenses</h2>
                    <IoArrowDownCircleOutline color="red" size={32} />
                </span>
                <h1 className='text-bold text-4xl'>{formatCurrency(expenses)}</h1>
            </div>

            <div className={total >= 0 ? "p-8 rounded-md border w-96 bg-custom-green-50 text-white" : "p-8 rounded-md border w-96 bg-custom-red-50 text-white"}>
                <span className='flex items-center justify-between'>
                    <h2>Total</h2>
                    <CiDollar color="white" size={32} />
                </span>
                <h1 className='text-bold text-4xl'>{formatCurrency(total)}</h1>
            </div>
        </section>
    );
};

export default Total;
