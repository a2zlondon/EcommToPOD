/* eslint-disable react/prop-types */

const Notification = ({ message }) => {

  if (message === {}) {
    return null
  }

  switch (message.severity) {
    case 'success':
      return (
        <div className='success'>
          {message.info}
        </div>
      )
    case 'error':
      return (
        <div className='error'>
          {message.info}
        </div>
      )
    default:
      return ''
  }

}

export default Notification