const Notification = ({ message, flag }) => {
    if (message === null) {
      return null
    } 
    return (
        <div className={flag}>
            <h1>{message}</h1>
        </div>
        
        )

  
   
  }

export default Notification