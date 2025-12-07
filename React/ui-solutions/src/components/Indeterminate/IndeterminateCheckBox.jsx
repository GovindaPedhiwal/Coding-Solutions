import React from 'react'
import './style.css'
import CheckBox from './CheckBox'

const IndeterminateCheckBox = ({data, handleCheckBox}) => {
    return (
      <div style={{marginLeft: 15}}>
        {
          data?.map((value, idx) => {
            return <div key={idx} style={{padding: 5}}>
              <CheckBox label={value.label} status={value?.status} id={value?.id} onChange={handleCheckBox} />
              {value?.children?.length && <IndeterminateCheckBox data={value?.children} handleCheckBox={handleCheckBox} />}
            </div>
          })
        }

      </div>
    )
}

export default IndeterminateCheckBox