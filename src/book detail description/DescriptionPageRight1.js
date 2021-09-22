import DescriptionPageRight2 from "./DesriptionPageRight2"
const DescriptionPageRight1=({title, books})=>{
    return(
        <div>
            <div className="mt-1">
                <h5 className="text-center">{title}</h5>
                <div>
                    {
                        books.map(book => (
                            <DescriptionPageRight2 book={book} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default DescriptionPageRight1