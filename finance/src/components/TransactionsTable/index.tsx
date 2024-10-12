import { FetchApiContext } from '@/contexts/FetchApi';
import { Edit } from '@/Edit';
import { Fetcher } from '@/functions/Fetch';
import React, { useContext } from 'react';
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";
import { MdDelete, MdEdit } from "react-icons/md";

export const TransactionsTable = () => {
    const { data } = useContext(FetchApiContext);

    const formatToBrazilianDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        if (!isNaN(date.getTime())) {
            return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }
        return 'Invalid Date';
    };

    const handleDelete = async (id: number) => {
        try {
            await fetch(`http://localhost:5051/modeltransaction/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            Fetcher(); // Atualiza a lista de transações após a exclusão
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container relative overflow-x-auto ">
            <table className="overflow-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3">Value</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.description}
                            </th>
                            <td className="px-6 py-4">
                                {item.type === 1 ? (
                                    <span className="text-green-500">+{item.value} R$</span>
                                ) : (
                                    <span className="text-red-500">-{item.value} R$</span>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {item.type === 1 ? <IoArrowUpCircleOutline color="#33cc95" size={22} /> : <IoArrowDownCircleOutline color="red" size={22} />}
                            </td>
                            <td className="px-6 py-4">
                                {item.createdAt ? formatToBrazilianDate(item.createdAt) : 'Invalid Date'}
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-red-500 mr-2" onClick={() => handleDelete(item.id)}>
                                    <MdDelete size={20} />
                                </button>
                                <button>
                                    <Edit idTransaction={item.id} descriptionTransaction={item.description} valueTransaction={item.value} typeTransaction={item.type} dateTransaction={item.createdAt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
