import React from 'react'

function ImageLoader(props) {
    return (
        <div className='h-auto lg:w-[360px] flex-none bg-cover rounded-t lg:rounded-t-md lg:rounded-lg'>
            <div className='relative'>
                {props.img ? <img className='h-auto absolute top-0 right-0' src={props.img} /> : null}
            </div>
        </div>
    );
}

export default ImageLoader