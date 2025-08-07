export default function ActiveBtn() {
    return (
        <div className="w-full h-full  flex items-center gap-[0.6875rem] ">
            <input
                type="checkbox"
                id="active-checkbox"
                className="w-[1.5rem] h-[1.5rem] " 
            />
            <label htmlFor="active-checkbox" className="font-inter font-medium text-[1.25rem] leading-[1.5rem] tracking-[0.03125rem]">
                Active
            </label>
        </div>
    );
}
