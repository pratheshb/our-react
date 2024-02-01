export default function render(reactElement, container) {
    if (!reactElement) {
        return;
    }
    if (['string', 'number'].includes(typeof reactElement)) {
        const textNode = document.createTextNode(String(reactElement));
        return container.appendChild(textNode);
    }
    const nativeElement = document.createElement(reactElement.tag);
    Object.keys(reactElement.props)
        .filter((prop) => prop !== 'children')
        .forEach((prop) => (nativeElement[prop] = reactElement.props[prop]));
    for (const child of reactElement.props.children) {
        render(child, nativeElement);
    }
    container.appendChild(nativeElement);
};