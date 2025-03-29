interface RenderSummaryType{
    data:any;
    level:number;
}
const RenderSummary = ({ data, level = 0 }:RenderSummaryType) => {
    if (!data || typeof data !== "object") {
        return null;
    }
    
    return (
        <div className={level === 0 ? "w-full" : "ml-8"}>
            {Object.entries(data).map(([key, val]) => (
                typeof val === "object" && val !== null ? (
                    <div key={`div-${key}`} className="grid grid-cols-12 gap-4 border-t-2 border-amber-100 p-4">
                        <h1 className="col-span-12 rounded-md bg-amber-100 text-blue-600 text-center">
                            {key.toUpperCase()}
                        </h1>
                        <div className="col-span-10 space-y-2 ml-8">
                            <RenderSummary data={val} level={level + 1} />
                        </div>
                    </div>
                ) : (
                    <div key={`div-${key}`} className="grid grid-cols-12 gap-4 px-5 py-2">
                        <span className="col-span-3 text-blue-400">{key.toUpperCase()}</span>
                        <span className="col-span-9">{val !== null && val !== undefined ? String(val) : "N/A"}</span>
                    </div>
                )
            ))}
        </div>
    );
};

export default RenderSummary;
