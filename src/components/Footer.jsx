const Footer = () => {
  const handleDate = () => {
    if (new Date().getFullYear() === 2023) {
      return new Date().getFullYear()
    } else {
      return `2023 - ${new Date().getFullYear()}`
    }
  }

  return (
    <footer className="footer">
      <p>© {handleDate()} All rights reserved</p>
    </footer>
  )
}

export default Footer
