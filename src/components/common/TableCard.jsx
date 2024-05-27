import React from 'react'
import Table from './Table'

function TableCard({tableHead,tableBody,deleteitem}) {
  return (
    <>
    <div className="card">
    <div className="card-header borderblue">
       <h3 className="card-title">All Users</h3>
    </div>
    <div className="card-body">
        <Table tableH={tableHead} deleteite={deleteitem} tableB={tableBody} />
    </div>
    </div>
    </>
  )
}

export default TableCard