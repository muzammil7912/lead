// import React from 'react'
// import { FaBars, FaLevelDownAlt, FaPlay, FaRegCircle, FaRegCopy, FaTrash } from 'react-icons/fa'
// import ExampleModal from './Editmodal'
// import { useDrag } from "react-dnd";

// function AgendaDroppable_list({item,addSubsubagenda,createAgenda,setStates,deleteAgenda,handleShowModal,copyAgenda,moveDown,addSubagenda,}) {
//     const [{ isDragging }, dragRef] = useDrag({
//         item: { type: 'box' },
//         collect: (monitor) => ({
//           isDragging: monitor.isDragging(),
//         }),
//       });
//     return (
//     <div  className="relative" ref={dragRef}>
//                         <ul className="agenda1appendBox list">
//                           <li className="mb-2 agenda1appendBoxp">
//                             <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
//                               <div className="agenda1appendBox__left d-flex align-item-center">
//                                 <div className="agenda1appendBox_drag ">
//                                   <FaBars />
//                                 </div>
//                                 <div className="agenda1appendBox_i">
//                                   <FaRegCircle />
//                                 </div>
//                                 <div className="agenda1appendBox_txt">
//                                   <h6 className="m-0">{item.item_title}</h6>
//                                 </div>
//                               </div>
//                               <div className="agenda1appendBox__right">
//                                 <ul className="list d-flex align-item-center">
//                                   <li>
//                                     {typeof +item.item_timer === "number" ? (
//                                       <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
//                                     ) : (
//                                       <div className="agenda1appendBox_time">NaN:00</div>
//                                     )}
//                                   </li>
//                                   <li className="agenda1appendBox_stop">
//                                     <FaPlay />
//                                   </li>
//                                   <li onClick={() => addSubagenda(item)} className="agenda1appendBox_sub">
//                                     <i className="fa fa-list-ul"></i>
//                                   </li>
//                                   <li onClick={() => moveDown(item)} className="agenda1appendBox_suggested">
//                                     <FaLevelDownAlt />
//                                   </li>
//                                   <li onClick={() => copyAgenda(item)} className="agenda1appendBox_duplicate">
//                                     <FaRegCopy />
//                                   </li>
//                                   <li onClick={handleShowModal} className="agenda1appendBox_edit">
//                                     <ExampleModal
//                                       item={item}
//                                       setStates={setStates}
//                                       agenda={'agenda'}
//                                     />
//                                   </li>
//                                   <li onClick={() => deleteAgenda(item)} className="agenda1appendBox__delete">
//                                     <FaTrash />
//                                   </li>
//                                 </ul>
//                               </div>
//                             </div>
//                           </li>
//                         </ul>
//                         {Array.isArray(item.sub_items) && item.sub_items.map((item, index) => (
//                           <div key={index} className="agenda1appendBoxpsubdiv">
//                             <ul className="list sortable ui-sortable">
//                               <li className="agenda1appendBoxp my-2" data-order="96" data-item="item">
//                                 <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
//                                   <div className="agenda1appendBox__left d-flex align-item-center">
//                                     <div className="agenda1appendBox_drag ui-sortable-handle">
//                                       <i className="fa-solid fa-bars"></i>
//                                     </div>
//                                     <div className="agenda1appendBox_i">
//                                       <i className="fa-regular fa-circle"></i>
//                                     </div>
//                                     <div className="agenda1appendBox_txt">
//                                       <h6 className="m-0">{item.item_title}</h6>
//                                     </div>
//                                   </div>
//                                   <div className="agenda1appendBox__right">
//                                     <ul className="list d-flex align-item-center">
//                                       <li>
//                                         {typeof +item.item_timer === "number" ? (
//                                           <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
//                                         ) : (
//                                           <div className="agenda1appendBox_time">NaN:00</div>
//                                         )}
//                                       </li>
//                                       <li className="agenda1appendBox_stop"><i className="fa-solid fa-play"></i></li>
//                                       <li onClick={() => addSubsubagenda(item)} className="agenda1appendBox_sub sub__loop"><i className="fa fa-list-ul"></i></li>
//                                       <li onClick={() => copyAgenda(item)} className="agenda1appendBox_duplicate"> <FaRegCopy /></li>
//                                       <li onClick={handleShowModal} className="agenda1appendBox_edit">
//                                         <ExampleModal
//                                           item={item}
//                                           setStates={setStates}
//                                           agenda={'agenda'}
//                                         />
//                                       </li>
//                                       <li onClick={() => deleteAgenda(item)} className="agenda1appendBox__delete"><i className="fa-solid fa-trash"></i></li>
//                                     </ul>
//                                   </div>
//                                 </div>
//                                 <div className="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ">
//                                   <ul className="list sortable ui-sortable">
//                                   </ul>
//                                 </div>
//                               </li>
//                             </ul>
//                             {Array.isArray(item.sub_items) && item.sub_items.map((item, index) => (
//                               <div key={index} className="agenda1appendBoxpsubdiv">
//                                 <ul className="list sortable">
//                                   <li className="agenda1appendBoxp my-2" data-order="19" data-item="item">
//                                     <div className="agenda1appendBox_ py-2 px-3 d-flex align-item-center justify-content-between">
//                                       <div className="agenda1appendBox__left d-flex align-item-center">
//                                         <div className="agenda1appendBox_drag ui-sortable-handle">
//                                           <i className="fa-solid fa-bars"></i>
//                                         </div>
//                                         <div className="agenda1appendBox_i">
//                                           <i className="fa-regular fa-circle"></i>
//                                         </div>
//                                         <div className="agenda1appendBox_txt">
//                                           <h6 className="m-0">{item.item_title}</h6>
//                                         </div>
//                                       </div>

//                                       <div className="agenda1appendBox__right">
//                                         <ul className="list d-flex align-item-center">
//                                           <li>
//                                             {typeof +item.item_timer === "number" ? (
//                                               <div className="agenda1appendBox_time">{`${+item.item_timer}:00`}</div>
//                                             ) : (
//                                               <div className="agenda1appendBox_time">NaN:00</div>
//                                             )}</li>
//                                           <li className="agenda1appendBox_stop">
//                                             <i className="fa-solid fa-play"></i>
//                                           </li>
//                                           <li onClick={() => copyAgenda(item)} className="agenda1appendBox_duplicate">
//                                             <FaRegCopy />
//                                           </li>
//                                           <li onClick={handleShowModal} className="agenda1appendBox_edit">
//                                             <ExampleModal
//                                               item={item}
//                                               setStates={setStates}
//                                               agenda={'agenda'}
//                                             />
//                                           </li>
//                                           <li className="agenda1appendBox__delete">
//                                             <i onClick={() => deleteAgenda(item)} className="fa-solid fa-trash"></i>
//                                           </li>
//                                         </ul>
//                                       </div>
//                                     </div>
//                                     <div className="agenda1appendBoxpsubdiv  agenda1appendBoxpsubdivZ"></div>
//                                   </li>
//                                 </ul>
//                               </div>
//                             ))}
//                           </div>
//                         ))}
//                       </div>
//   )
// }

// export default AgendaDroppable_list












// ///////////////////////////////////////////////////////////////////////////////////////////////////////












// import { useRef } from 'react'
// import { useDrag, useDrop } from 'react-dnd'
// // import { listItemStyle as style } from './style'
// import React, { useState, useCallback } from 'react'
// import { useEffect } from 'preact/hooks'
// // import { ListItem } from './ListItem'
// // import { listStyle as style } from './style'

// export const ListItem = ({ text, index, moveListItem }) => {

//     // useDrag - the list item is draggable
//     const [{ isDragging }, dragRef] = useDrag({
//         type: 'item',
//         item: { index },
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging(),
//         }),
//     })


//     // useDrop - the list item is also a drop area
//     const [spec, dropRef] = useDrop({
//         accept: 'item',
//         hover: (item, monitor) => {
//             const dragIndex = item.index
//             const hoverIndex = index
//             const hoverBoundingRect = ref.current?.getBoundingClientRect()
//             const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
//             const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

//             // if dragging down, continue only when hover is smaller than middle Y
//             if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
//             // if dragging up, continue only when hover is bigger than middle Y
//             if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

//             moveListItem(dragIndex, hoverIndex)
//             item.index = hoverIndex
//         },
//     })

//     // Join the 2 refs together into one (both draggable and can be dropped on)
//     const ref = useRef(null)
//     const dragDropRef = dragRef(dropRef(ref))

//     // Make items being dragged transparent, so it's easier to see where we drop them
//     const opacity = isDragging ? 0.3 : 1
//     return (
//         <div className='box border ' ref={dragDropRef} style={{ opacity }}>
//             {text}
//         </div>
//     )
// }



// const PETS = [
//     { id: 1, name: 'dog' },
//     { id: 2, name: 'cat' },
//     { id: 3, name: 'fish' },
//     { id: 4, name: 'hamster' },
// ]

// export const List = ({viewAgenda,setViewagenda}) => {
//     console.log(viewAgenda)
//     // const [pets, setPets] = useState(viewAgenda)
// // useEffect(()=>{
// // if(Array.isArray(viewAgenda)){setPets(viewAgenda)}
// // },[viewAgenda])
//     const movePetListItem = useCallback(
//         (dragIndex, hoverIndex) => {
//             const dragItem = viewAgenda[dragIndex]
//             const hoverItem = viewAgenda[hoverIndex]
//             // Swap places of dragItem and hoverItem in the viewAgenda array
//             setViewagenda(viewAgenda => {
//                 const updatedviewAgenda = [...viewAgenda]
//                 updatedviewAgenda[dragIndex] = hoverItem
//                 updatedviewAgenda[hoverIndex] = dragItem
//                 return updatedviewAgenda
//             })
//         },
//         [viewAgenda],
//     )

//     return (
//         <div className='box border-box'>
//             {            console.log(viewAgenda)
// } { 
//             Array.isArray(viewAgenda)&&
//             viewAgenda.map((value, index) => (
//             <ListItem
//                 key={value.db_id}
//                 index={index}
//                 text={value.item_title}
//                 moveListItem={movePetListItem}
//             />
//         ))}
//         </div>
//     )
// }