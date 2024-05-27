
import { useStore } from './store.js';

function Item(section, item) {
    const addItem = useStore((store) => store.addItem);

    return (
        <div key={item.code} className={"item " + item.style} onClick={addItem(item)}>
            <div className="item-name"><p>{item.name}</p></div>
            <div className="item-price"><p>{item.price.toFixed(2)}€</p></div>
        </div>
    )
}

function Section(section) {
    return (
        <div className="section" key={section.code}>
            <h1>{section.title}</h1>
            <div className="section-items">
                {section.items.map(i => Item(section, i))}
            </div>
        </div>
    );
}

function Catalog({data}) {
    if (!data) return;
    return (<>
        {data.sections && data.sections.map(s => Section(s))}
    </>);
}

export default Catalog;