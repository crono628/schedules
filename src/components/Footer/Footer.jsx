const Footer = () => {
  const handleDate = () => {
    if (new Date().getFullYear() === 2023) {
      return new Date().getFullYear()
    } else {
      return `2023 - ${new Date().getFullYear()}`
    }
  }

  return (
    <div className="footer">
      © {handleDate()} Michael DeSantis. All rights reserved.
    </div>
  )
}

export default Footer
