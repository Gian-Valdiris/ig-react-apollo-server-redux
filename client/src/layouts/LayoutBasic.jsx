import Header from '../components/header/index';
function LayoutBasic({children}) {

  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default LayoutBasic
