
const SectionCover = ({title , subtitle ,image}) => {
    return (
        <div
            className=" flex px-16 items-center min-h-96 pt-4"
            style={{
                backgroundImage:
                    `url(${image})`,
                    backgroundPosition:'center',
                  

            }}
        >
            <div className="text-left"></div>
            <div className=" ">
                <div>
                    <h1 className="mb-5 text-5xl font-bold text-white rounded-2xl px-6 py-2 bg-[#F04336] text-left ">{title}</h1>
                    <p className='text-[#F04336] font-bold'>Home | <span className='text-white'>{title}</span></p>
                    
                </div>
            </div>
        </div>
    );
};

export default SectionCover;