


import React from "react";

export default function MenuItemCard({ image, imageTitle, title, status, category, subCategory, price, currency, onDelete }) {
    return (
        <div className="w-full">
            <div className="rounded-[20px] border border-[#D9D9D9] bg-white flex h-[150px] md:h-[198px] lg:h-[220px] px-2 md:px-4 lg:px-6 justify-between items-center self-stretch">
                <div className="flex items-start gap-6 items-center"
                >
                    <img
                        src={image}
                        alt={imageTitle}
                        className="w-[100px] h-[90px] sm:w-[200px] sm:h-[143px] md:w-[240px] md:h-[172px] flex-shrink-0 rounded-[20px]"
                    />
                    <div className="flex max-w-[320px] md:w-[485px] flex flex-col items-start gap-[12px] shrink-0">
                        <div className="text-black font-[Inter] text-base md:text-[24px] font-semibold leading-[1.5em] tracking-[0.5px] self-stretch"
                        >{title}</div>
                        <div className="flex h-[22px] p-[8px] gap-[8px] justify-center items-center md:h-[28px] md:p-[10px] md:gap-[10px] lg:h-[34px] lg:p-[12px] lg:gap-[12px] rounded-[10px] bg-[#A1FFA4]"
                        >
                            <div className="text-[#007904] font-[Inter] font-medium text-[14px] leading-[20px] tracking-[0.4px] md:text-[16px] md:leading-[24px] md:tracking-[0.5px]"
                            >{status}</div>
                        </div>

                        <div className="flex items-center"
                        >
                            <div className="text-black font-[Inter] text-[16px] font-medium leading-[20px] tracking-[0.4px] md:text-[20px] md:leading-[24px] md:tracking-[0.5px]"
                            >{category}</div>
                            <div className="mx-[0.4em] text-[16px] md:mx-[0.5em] md:text-[20px] text-[#3D3D3D]">•</div>
                            <div className="text-[#3D3D3D] font-[Inter] text-[16px] font-medium leading-[20px] tracking-[0.4px] md:text-[20px] md:leading-[24px] md:tracking-[0.5px]"
                            >{subCategory}</div>
                        </div>
                        <div className=" flex text-[#FF6E30] font-[Inter] text-[20px] font-semibold leading-[28px] tracking-[0.4px] md:text-[24px] md:leading-[24px] md:tracking-[0.5px]"
                        >
                            <div>{price}</div>
                            <div className="pl-[0.3em]">{currency}</div>
                        </div>
                    </div>
                </div>

                <div className="flex h-[130px] md:h-[172px] lg:h-[200px] items-start gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]">
                        <path d="M21.3112 6.87846L17.1216 2.68971C16.9823 2.55038 16.8169 2.43986 16.6349 2.36446C16.4529 2.28905 16.2578 2.25024 16.0608 2.25024C15.8638 2.25024 15.6687 2.28905 15.4867 2.36446C15.3047 2.43986 15.1393 2.55038 15 2.68971L3.43969 14.25C3.29979 14.3888 3.18888 14.554 3.1134 14.736C3.03792 14.9181 2.99937 15.1133 3 15.3103V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10217 21 4.5 21H20.25C20.4489 21 20.6397 20.921 20.7803 20.7803C20.921 20.6397 21 20.4489 21 20.25C21 20.0511 20.921 19.8603 20.7803 19.7197C20.6397 19.579 20.4489 19.5 20.25 19.5H10.8112L21.3112 9.00002C21.4506 8.86073 21.5611 8.69535 21.6365 8.51334C21.7119 8.33133 21.7507 8.13625 21.7507 7.93924C21.7507 7.74222 21.7119 7.54714 21.6365 7.36513C21.5611 7.18312 21.4506 7.01775 21.3112 6.87846ZM8.68969 19.5H4.5V15.3103L12.75 7.06033L16.9397 11.25L8.68969 19.5ZM18 10.1897L13.8112 6.00002L16.0612 3.75002L20.25 7.93971L18 10.1897Z" fill="#646464" />
                    </svg>
                    <button onClick={onDelete} title="delete-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-[16px] h-[16px] md:w-[24px] md:h-[24px]">
                        <path d="M20.25 4.5H16.5V3.75C16.5 3.15326 16.2629 2.58097 15.841 2.15901C15.419 1.73705 14.8467 1.5 14.25 1.5H9.75C9.15326 1.5 8.58097 1.73705 8.15901 2.15901C7.73705 2.58097 7.5 3.15326 7.5 3.75V4.5H3.75C3.55109 4.5 3.36032 4.57902 3.21967 4.71967C3.07902 4.86032 3 5.05109 3 5.25C3 5.44891 3.07902 5.63968 3.21967 5.78033C3.36032 5.92098 3.55109 6 3.75 6H4.5V19.5C4.5 19.8978 4.65804 20.2794 4.93934 20.5607C5.22064 20.842 5.60218 21 6 21H18C18.3978 21 18.7794 20.842 19.0607 20.5607C19.342 20.2794 19.5 19.8978 19.5 19.5V6H20.25C20.4489 6 20.6397 5.92098 20.7803 5.78033C20.921 5.63968 21 5.44891 21 5.25C21 5.05109 20.921 4.86032 20.7803 4.71967C20.6397 4.57902 20.4489 4.5 20.25 4.5ZM10.5 15.75C10.5 15.9489 10.421 16.1397 10.2803 16.2803C10.1397 16.421 9.94891 16.5 9.75 16.5C9.55109 16.5 9.36032 16.421 9.21967 16.2803C9.07902 16.1397 9 15.9489 9 15.75V9.75C9 9.55109 9.07902 9.36032 9.21967 9.21967C9.36032 9.07902 9.55109 9 9.75 9C9.94891 9 10.1397 9.07902 10.2803 9.21967C10.421 9.36032 10.5 9.55109 10.5 9.75V15.75ZM15 15.75C15 15.9489 14.921 16.1397 14.7803 16.2803C14.6397 16.421 14.4489 16.5 14.25 16.5C14.0511 16.5 13.8603 16.421 13.7197 16.2803C13.579 16.1397 13.5 15.9489 13.5 15.75V9.75C13.5 9.55109 13.579 9.36032 13.7197 9.21967C13.8603 9.07902 14.0511 9 14.25 9C14.4489 9 14.6397 9.07902 14.7803 9.21967C14.921 9.36032 15 9.55109 15 9.75V15.75ZM15 4.5H9V3.75C9 3.55109 9.07902 3.36032 9.21967 3.21967C9.36032 3.07902 9.55109 3 9.75 3H14.25C14.4489 3 14.6397 3.07902 14.7803 3.21967C14.921 3.36032 15 3.55109 15 3.75V4.5Z" fill="#EA1414" />
                    </svg>
                    </button>
                    
                </div>
            </div>
        </div>

    );
}
