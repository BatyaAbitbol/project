import { UseGetAll, UseGetPrice } from "../../Hooks/useGetAxios"
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useNavigate } from 'react-router-dom';

const Courses = (props) => {

    const [layout, setLayout] = useState('grid');
    const [products, setProducts] = useState([])
    const navigate = useNavigate();

    const status = JSON.parse(localStorage.getItem('userInfo')).status;

    useEffect(() => {
        const fetchData = async () => {
            const res = await UseGetAll('courses');
            setProducts(res.data);
        }
        fetchData();
    }, []);

    const listItem = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product.image} alt={product.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <div className="text-2xl font-bold">{product.description}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.categoryId}</span>
                                </span>
                                {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">{product.price} $</span>
                            <Button icon="pi pi-tag" className="p-button-rounded" label="Buy It!" onClick={(e) => { navigate('/course/payment') }}></Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        {/* <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.categoryId}</span>
                        </div> */}
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">

                        <img className="w-9 shadow-2 border-round" src={product.image} alt={product.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <div className="text-2xl font-bold">{product.description}</div>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">{product.price} $</span>
                        <Button
                            icon="pi pi-shopping-cart"
                            className="p-button-rounded"
                            onClick={(e) => { navigate(`/payment/${product.id}`); }}
                        ></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }
        if (layout === 'list')
            return listItem(product);
        else if (layout === 'grid')
            return gridItem(product);
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <div style={{ textAlign: 'center', fontSize: '3.5rem', fontWeight: 'bold' }}>Our Courses</div>
            <DataView value={products} itemTemplate={itemTemplate} layout={layout} header={header()} />
            <Button label="My Courses" onClick={(e) => navigate(`${status}/my-courses`)} />
        </div>
    )
}
export default Courses;
