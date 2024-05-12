
import { useStore } from './store.js';

function Item(section, item) {
    const addItem = useStore((store) => store.addItem);

    return (
        <div className={"item " + item.style} onClick={addItem(section.title, item)}>
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
                {section.items.map(i => <div key={i.id || i.name}>{Item(section, i)}</div>)}
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