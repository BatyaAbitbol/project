import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import UseGetAllById from '../../Hooks/useGetAxios'

export default function ViewQuestion() {
    const [products, setProducts] = useState([]);
    const columns = [
        {field: 'num', header: 'Code'},
        {field: '?', header: 'Name'},
        {field: 'correct answer', header: 'Quantity'},
        {field: 'worng answer', header: 'Category'},
        {field: 'worng answer', header: 'Category'},
        {field: 'worng answer', header: 'Category'}
    ];

    useEffect(() => {
        const fetchData = async () => {
            const res = await UseGetAllById('questions', id);
            if (res.status != 204)
                setDatas(res.data);
            else setDatas(res.statusText)
        }
        fetchData();
    }, [])
    return (
        <div className="card">
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
    );
}
        