import React from 'react'

function about() {
  return (
    // <div className='flex flex-row w-full'>
    //   <div className='flex flex-col w-full items-center pb-10 gap-28'>
    //     <div className='flex flex-col items-start w-[60%]'>
    //       <h1 className='text-[44px] font-bold'>About</h1>
    //       <p className='text-md text-start'>
    //         This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test
    //       </p>
    //       <div className='w-[800px] h-[400px] bg-black p-4'></div>
    //     </div>
    //     <div className='flex flex-col items-start w-[60%]'>
    //       <h1 className='text-[36px] font-bold'>About</h1>
    //       <p className='text-md text-start'>
    //         This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test
    //       </p>
    //       <div className='w-[800px] h-[300px] bg-black p-4'></div>
    //     </div>
    //     <div className='flex flex-col items-start w-[60%]'>
    //       <h1 className='text-[36px] font-bold'>About</h1>
    //       <p className='text-md text-start'>
    //         This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test This is a longer segment of text on this page that fills up a bit more space than normal
    //         text test
    //       </p>
    //       <div className='w-[800px] h-[300px] bg-black p-4'></div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="h-screen bg-[#4d4d4d] flex items-center justify-center">
        <div className="w-6/12 flex bg-red-500 min-h-[600px] rounded-[10px]">
          <div className="flex-1 items-center flex flex-col gap-[30px] text-[white] p-[50px]">
            <h1 className='text-[60px]'>Filler Text</h1>
            <p>Even More Filler Text</p>
            <span className='text-sm'>More things</span>
            <button className='w-6/12 bg-[white] text-[red] cursor-pointer font-[bold] p-2.5 border-[none]'>Register</button>
          </div>
          <div className="flex-1 bg-white flex flex-col items-center justify-center">
            <h1 className='mb-[30px]'>Login</h1>
            <form className='flex flex-col items-start gap-[30px]' action="post">
              <input className=' p-2.5 border-b-[lightgray] border-[none] border-b border-solid outline-none' type="text" placeholder="Username" />
              <input className=' p-2.5 border-b-[lightgray] border-[none] border-b border-solid outline-none' type="text" placeholder="Password" />
              <button className=' w-6/12 bg-[red] text-[white] cursor-pointer p-2.5 border-[none]'>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default about;