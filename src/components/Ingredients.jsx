import React from 'react';
import ZappBerry from '../assets/zapp-berry.png';
import ZappLime from '../assets/zapp-lime.png';

const Ingredients = () => {
  return (
    <div className=' flex flex-col-reverse md:flex-row p-10 justify-around items-center h-screen'>
        <div className=' w-full md:w-[70%]'>
            <h1 className=' text-xl md:text-3xl my-5'>The Ingredients That Set Us Apart:</h1>
            <p className=' text-[16px] md:text-lg'>Zapp Energy Shot includes high-quality ingredients like green tea extract and theacrine, which are rarely found in traditional energy drinks. Green tea extract provides natural antioxidants and a smoother energy release, while theacrine enhances focus and reduces fatigue without causing the usual caffeine crash. Combined with a higher caffeine content, these ingredients make Zapp a balanced and effective energy drink for long-lasting performance.</p>
        </div>
        <div>
            <img src={ZappLime} alt="" width={300} className=' w-[200px] md:w-[300px]' />
        </div>
    </div>
  )
}

export default Ingredients