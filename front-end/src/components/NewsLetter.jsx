import React from 'react'

const NewsLetter = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        console.log(email);
        e.target[0].value = "";
    }

    return (
        <div className="text-center">
            <div className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</div>
            <p className="text-gray-400 mt-3">Subscribe to our newsletter and get the latest updates</p>
            <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3' onSubmit={onSubmit}>
                <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required />
                <button className="bg-black text-white text-xs px-10 py-4" type="submit">Subscribe</button>
            </form>
        </div>
    )
}

export default NewsLetter
