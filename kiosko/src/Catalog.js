function Item(item) {
    return (
        <div className={"item " + item.style}>
            <div className="item-name"><p>{item.name}</p></div>
            <div className="item-price"><p>{item.price}€</p></div>
        </div>
    )
}

function Section(section) {
    return (
        <div>
            <h1>{section.title}</h1>
            <div className="section-items">
                {section.items.map(i => <div key={i.id || i.name}>{Item(i)}</div>)}
            </div>
        </div>
    );
}

function Catalog({data}) {
    return (<>
        {data.sections.map(s => <section key={s.id || s.name}>{Section(s)}</section>)}
    </>);
}

export default Catalog;