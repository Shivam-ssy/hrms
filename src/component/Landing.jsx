import { Link } from 'react-router-dom'
function Landing() {
  return (
    <div className="h-screen w-full bg-[url('/bgImage.jpeg')] bg-no-repeat bg-cover bg-gray-500">
      <nav className='w-full flex justify-end items-center px-10 bg-blue-950 h-20'>
        <Link to="/login"><button className='bg-orange-600 rounded-2xl h-fit font-bold text-white text-2xl px-5 py-3'>Login</button></Link>
      </nav>
    </div>
  )
}

export default Landing
