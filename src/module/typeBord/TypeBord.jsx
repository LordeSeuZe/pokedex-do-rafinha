import TypeMerge from "../../imgs/typeMerge";
import "./style.scss"

function TypeBord({ tipo }) {
    const data = TypeMerge[tipo];
    if (!data) return null;

    return (
        <div className="type-icons">
            <img className="typeImage" src={data.image} alt={tipo} />
            <img className="typeSubImage" src={data.subImage} alt={tipo} />
        </div>
    )
}

export default TypeBord;