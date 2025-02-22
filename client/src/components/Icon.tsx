import { FaChessPawn } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Icon = ({color}: {color: string}) => {

  const handleMove = () => {
const num = Math.floor(Math.random() * 6 + 1)
toast.info(num)
  }
  return (
  <div>
<button className='absolute top-0 right-0' onClick={handleMove}>move </button>

      <div className="w-fit mt-[-39px]  flex gap-0" onClick={handleMove }>
        <FaChessPawn color={color} size={24} />
       
      </div>
  </div>
  )
}

export default Icon