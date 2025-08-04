export default function SaveCancelBtn({
    onSave, onCancel, mode,
}:{
    onSave?: ()=> void;
    onCancel?:()=> void;
    mode?: string;
}) {

    const isSaveMode = mode === "save";
    return (
        <div className="w-full h-full flex gap-5">
            <button onClick={onSave || (()=>{})} className="bg-primary w-[50%] text-white p-[0.625rem] rounded-[0.625rem]">Save</button>
            <button onClick= {onCancel || (()=> {})} className="bg-secondary w-[50%]  p-[0.625rem] rounded-[0.625rem]">Cancel</button>
        </div>
    );
}
