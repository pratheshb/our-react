import render from './ReactDOM';
let rootElement = null;
const componentHooks = [];
let hooksIndex = 0;
let componentEffects = [];
let isEffectCalled = false;
const React = {
    createElement(tag, props, ...children) {
        if (!rootElement) {
            rootElement = tag;
        }
        if (typeof tag === 'function') {
            return tag(props);
        }
        const element = { tag, props: { ...props, children } };
        return element;
    },
};

function useState(initialState) {
    const index = hooksIndex;
    componentHooks[index] = componentHooks[index] || initialState;

    function setState(nextState) {
        componentHooks[index] = nextState;
        updateDOM();
    }
    hooksIndex++;
    return [componentHooks[index], setState];
};

function useEffect(cb, deps) {
    if (isEffectCalled) {
        return;
    }
    componentEffects.push({ cb, deps });
}

function clearEffects() {
    componentEffects.forEach(effect => {
        if (typeof effect.clearCb === 'function') {
            effect.clearCb();
        }
    });
    componentEffects = [];
}


function runEffects() {
    componentEffects.forEach(effect => {
        effect.clearCb = effect.cb();
    });
    isEffectCalled = true;
}

function updateDOM() {
    hooksIndex = 0;
    document.querySelector('#app').firstChild?.remove();
    clearEffects();
    render(React.createElement(rootElement, rootElement.props), document.querySelector('#app'));
    runEffects();
}
export default React;
export { useState, useEffect };