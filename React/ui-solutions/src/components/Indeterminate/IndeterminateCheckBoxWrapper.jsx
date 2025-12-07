import React, { useState } from 'react'
import IndeterminateCheckBox from './IndeterminateCheckBox'
import { data as data_, STATUS } from './data'

const IndeterminateCheckBoxWrapper = () => {
    const [checkboxState, setCheckboxState] = useState(data_);
    const computeStatus = (root) => {
      if(!root?.children) return;
      let totalChecked = 0;
      let totalUnChecked = 0;
      let totalIndeterminate = 0;
      let totalChildren = root?.children?.length;
      root?.children?.forEach((child) => {
        if(child?.status == STATUS.CHECKED) {
          totalChecked++;
        } else if(child?.status == STATUS.UNCHECKED) {
          totalUnChecked++;
        } else if(child?.status == STATUS.INDETERMINATE) {
          totalIndeterminate++;
        }
      })
      if(totalChecked == totalChildren) {
        root.status = STATUS.CHECKED;
      } else if(totalUnChecked == totalChildren) {
        root.status = STATUS.UNCHECKED;
      }
      else if(totalChecked > 0 || totalIndeterminate > 0) {
        root.status = STATUS.INDETERMINATE;
      }
    }
    const traverse = (targetId, root, isDecendent, ancestorStatus) => {
      if(targetId == root?.id) {
        console.log(root)
        if(root?.status == STATUS.CHECKED) {
          root.status = STATUS.UNCHECKED;
        } else {
          root.status = STATUS.CHECKED;
        }
      }

      if(isDecendent) {
        root.status = ancestorStatus;
      }


      if(root?.children) {
        root?.children?.forEach((child) => {
          traverse(targetId, child, targetId == root?.id || isDecendent, root.status);
        })
      }
      computeStatus(root);
    }
    const handleCheckBox = (targetId) => {
      console.log(targetId)
      const cloneCheckboxState = structuredClone(checkboxState);

      cloneCheckboxState?.forEach((root) => {
        traverse(targetId, root);
      })
      traverse(targetId, cloneCheckboxState);

      setCheckboxState(cloneCheckboxState);
    }


    return (
      <div>
          <h1>
              IndeterminateCheckBox
          </h1>
          <IndeterminateCheckBox data={checkboxState} handleCheckBox={handleCheckBox} />
      </div>
    )
}

export default IndeterminateCheckBoxWrapper