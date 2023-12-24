import React from 'react'

function Alert(props) {
  const capitalize = (word) => {
    if (word === 'danger'){
      word = 'failure'
    }
    if (typeof word !== 'string' || word.length === 0) {
      return word;
    }
    const lower = word.toLowerCase();
    const capitalize =  lower.charAt(0).toUpperCase() + lower.slice(1);
    return capitalize + '!';
  };

  return (
    <div style={{ height: '50px' }}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(props.alert.type)}  </strong> {props.alert.msg}

      </div>}
    </div>
  )
}

export default Alert
