import React from 'react'

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primColor" role="status">
      <span className="visually-hidden ">Loading...</span>
    </div>

    </div>

  )
}
