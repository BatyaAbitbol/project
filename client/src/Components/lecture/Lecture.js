import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import  {UseGetAllById}  from "../../Hooks/useGetAxios"
const Lectures =(props)=> {
        const [lectures,setLectures]=useState(null)
        const responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
        useEffect(()=>{
            const fetchData=async()=>{
                const id=localStorage.getItem('studentInfo').courseId;
                const res = await UseGetAllById('lectures',id);
                console.log(res.data);
                setLectures(res.data);
            }
        fetchData()
        },[]);
      
        // const navigate = useNavigate();
    


    // const productTemplate = (lectureByCourse) => {
    //     return (
    //         <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
    //             <div className="mb-3">
    //             {/* <img src={`https://primefaces.org/cdn/primereact/images/lectureByCourseent/${lectureByCourseent.image}`} alt={lectureByCourseent.name} className="w-6 shadow-2" /> */}
    //             </div>
    //             <div>
    //                 <h4 className="mb-1">{lectureByCourse.courseId}</h4>
    //                 <h6 className="mt-0 mb-3">${lectureByCourse.studentId}</h6>
    //                 {/* <Tag value={lectureByCourseent.inventoryStatus} severity={getSeverity(lectureByCourseent)}></Tag> */}
    //                 <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
    //                     <Button icon="pi pi-search" className="p-button p-button-rounded" />
    //                     <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    // return (
    //     <div className="card">
    //         <Carousel value={lectures} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={productTemplate} />
    //     </div>
    // )
}
export default Lectures;
        