// import React, { useState, useEffect } from 'react';
// import { Button } from 'primereact/button';
// import { DataView } from 'primereact/dataview';
// // import { Rating } from 'primereact/rating';
// // import { Tag } from 'primereact/tag';
// // import { useGetAll } from '../../Hooks/useGetAxios';
// import { GetAllCourses } from '../../services/GetCourses';
// import { useGetAll } from '../../Hooks/useGetAxios';

import { useGetAll } from "../../Hooks/useGetAxios"

// export async function Courses() {
//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//         const res = GetAllCourses();
//         res.then((data) => setCourses(data));
//     }, []);
//     // const getSeverity = (course) => {
//     //     switch (course.inventoryStatus) {
//     //         case 'INSTOCK':
//     //             return 'success';

//     //         case 'LOWSTOCK':
//     //             return 'warning';

//     //         case 'OUTOFSTOCK':
//     //             return 'danger';

//     //         default:
//     //             return null;
//     //     }
//     // };

//     const itemTemplate = (course) => {
//         return (
//             <div className="col-12">
//                 <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
//                     <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/course/${course.image}`} alt={course.name} />
//                     <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
//                         <div className="flex flex-column align-items-center sm:align-items-start gap-3">
//                             <div className="text-2xl font-bold text-900">{course.name}</div>
//                             {/* <Rating value={course.rating} readOnly cancel={false}></Rating> */}
//                             <div className="flex align-items-center gap-3">
//                                 <span className="flex align-items-center gap-2">
//                                     <i className="pi pi-tag"></i>
//                                     <span className="font-semibold">{course.category}</span>
//                                 </span>
//                                 {/* <Tag value={course.inventoryStatus} severity={getSeverity(course)}></Tag> */}{/*disabled={course.inventoryStatus === 'OUTOFSTOCK'}*/}
//                             </div>
//                         </div>
//                         <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
//                             <span className="text-2xl font-semibold">${course.price}</span>
//                             <Button icon="pi pi-shopping-cart" className="p-button-rounded"></Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div className="card">
//             <DataView value={courses} itemTemplate={itemTemplate} />
//         </div>
//     )
// }
export async function Courses (props) {

    const res = await useGetAll('courses');
    return (
        <>
            {res.data}
        </>
    )
}